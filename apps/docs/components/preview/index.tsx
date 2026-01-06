import {
  SandboxCodeEditor,
  SandboxConsole,
  SandboxFileExplorer,
  SandboxLayout,
  SandboxPreview,
  SandboxTabs,
  SandboxTabsContent,
  SandboxTabsList,
  SandboxTabsTrigger,
} from './sandbox';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './resizable';
import { AppWindowIcon, CodeIcon, TerminalIcon } from 'lucide-react';
import { content } from './content';
import { PreviewProvider } from './provider';
import { tsconfig } from './tsconfig';
import { utils } from './utils';

type RegistryItem = {
  name: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files?: { path: string; content: string, type: string, target: string }[];
};

type PreviewProps = {
  name: string;
  code: string;
  dependencies?: Record<string, string>;
};

// Caches to avoid repeated imports
const registryCache = new Map<string, RegistryItem>();
const packageCache = new Map<string, any>();

const parseShadcnHooks = async (results: any, name: string) => {
  let registry = registryCache.get(name);
  if (!registry) {
    registry = (await import(
      `./shadcn/${name}.json`
    )) as RegistryItem;
    registryCache.set(name, registry);
  }

  if (registry?.dependencies?.length) {
    const dependencies = registry?.dependencies?.reduce((acc: any, curr: any) => {
      acc[curr] = 'latest';
      return acc;
    }, {} );

    Object.assign(results.dependencies, dependencies);
  }

  if (registry?.devDependencies?.length) {
    const devDependencies = registry?.devDependencies?.reduce((acc: any, curr: any) => {
      acc[curr] = 'latest';
      return acc;
    }, {} );

    Object.assign(results.devDependencies, devDependencies);
  }

  registry?.files?.map((file: any) => {
    results.files[file.target] = file.content;
  });

  if (registry.registryDependencies?.length) {
    for (let index = 0; index < registry.registryDependencies.length; index++) {
      const dependency = registry.registryDependencies[index];
      let mod = registryCache.get(dependency.replace('.json', ''));

      if (mod) {
        continue;
      }

      if (!mod) {
        mod = (await import(
          `./shadcn/${dependency?.includes('json') ? dependency : `${dependency}.json`}`
        )).default as RegistryItem;
        registryCache.set(dependency.replace('.json', ''), mod as RegistryItem);
      }

      if (mod?.name) {
        await parseShadcnHooks(results, mod?.name);
      }
    }
  }
}


const parseShadcnComponentToSandbox = async (name: string, codeDemo: string) => {
  const results = {
    files: {} as Record<string, string>,
    dependencies: {} as Record<string, string>,
    devDependencies: {} as Record<string, string>,
  }
  // // Set up initial files
  Object.assign(results.files, {
    '/App.tsx': codeDemo,
    '/tsconfig.json': tsconfig,
    // '/lib/utils.ts': utils,
    // '/lib/content.ts': content,
  });

  await parseShadcnHooks(results, name);

  return results;
}

const init = async (name:string, code:string) => {
  const result = {
    files: {} as Record<string, string>,
    dependencies: {} as Record<string, string>,
    devDependencies: {} as Record<string, string>,
  }

  const dataCache = packageCache.get(name);

  if (dataCache) {
    const { files, dependencies, devDependencies } = dataCache;
    result.files = files;
    result.dependencies = dependencies;
    result.devDependencies = devDependencies;
  } else {
    const { files, dependencies, devDependencies } = await parseShadcnComponentToSandbox(name, code);
    packageCache.set(name, { files, dependencies, devDependencies });
    result.files = files;
    result.dependencies = dependencies;
    result.devDependencies = devDependencies;
  }

  return result;
}


export const Preview = async ({
  name,
  code,
}: PreviewProps) => {
  const { files, dependencies, devDependencies } = await init(name, code);

  return (
    <PreviewProvider
      template="react-ts"
      options={{
        externalResources: [
          'https://cdn.tailwindcss.com',
          'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
        ],
      }}
      customSetup={{
        dependencies: {
          // shadcn/ui global dependencies
          '@radix-ui/react-icons': 'latest',
          clsx: 'latest',
          'tailwind-merge': 'latest',
          'class-variance-authority': 'latest',
          // shadcn/ui tailwind plugins
          tailwindcss: 'latest',
          'tailwindcss-animate': 'latest',
          // Tailwind dependencies
          ...dependencies,
        },
        devDependencies: {
          autoprefixer: 'latest',
          postcss: 'latest',
          ...devDependencies,
        },
      }}
      files={files}
      className="not-prose h-[30rem]"
    >
      <SandboxLayout>
        <SandboxTabs defaultValue="preview">
          <SandboxTabsList>
            <SandboxTabsTrigger value="code">
              <CodeIcon size={14} />
              Code
            </SandboxTabsTrigger>
            <SandboxTabsTrigger value="preview">
              <AppWindowIcon size={14} />
              Preview
            </SandboxTabsTrigger>
            <SandboxTabsTrigger value="console">
              <TerminalIcon size={14} />
              Console
            </SandboxTabsTrigger>
          </SandboxTabsList>
          <SandboxTabsContent value="code" className="overflow-hidden">
            <ResizablePanelGroup
              direction="horizontal"
              className="overflow-hidden"
            >
              <ResizablePanel
                className="!overflow-y-auto"
                defaultSize={25}
                minSize={20}
                maxSize={40}
              >
                <SandboxFileExplorer />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel className="!overflow-y-auto">
                <SandboxCodeEditor />
              </ResizablePanel>
            </ResizablePanelGroup>
          </SandboxTabsContent>
          <SandboxTabsContent value="preview">
            <SandboxPreview />
          </SandboxTabsContent>
          <SandboxTabsContent value="console">
            <SandboxConsole />
          </SandboxTabsContent>
        </SandboxTabs>
      </SandboxLayout>
    </PreviewProvider>
  );
};
