/* eslint-disable no-console */
import './App.css';
import { useState } from 'react';

import Modal from '@rc-ui/dialog';
import Select from '@rc-ui/select';
import Tooltip from '@rc-ui/tooltip';
import { Picker, PickerPanel, RangePicker } from '@rc-ui/picker';

import enUS from 'rc-picker/lib/locale/en_US';
import 'dayjs/locale/vi';

import '@rc-ui/base/style.css';
import '@rc-ui/dialog/style.css';
import '@rc-ui/picker/style.css';
import '@rc-ui/select/style.css';
import '@rc-ui/tooltip/style.css';

const options: any = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

function App() {
  const [visible, setVisible] = useState(false);

  function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  }

  return (
    <>
      <button
        onClick={() => {
          document.documentElement.classList.toggle('dark');
        }}
      >
        Theme
      </button>

      <br />
      <br />

      <div>
        <h1>Modal</h1>
        <button onClick={() => setVisible(true)}>Click</button>
        <Modal visible={visible} onClose={() => setVisible(false)}>
          <p
            style={{
              color: 'black',
            }}
          >
            Hello
          </p>
        </Modal>
      </div>

      <br />
      <br />

      <div>
        <h1>Picker</h1>

        <Picker
          locale={enUS}
          format='DD/MM/YYYY'
          onChange={(v) => {
            console.log(v);
          }}
          suffixIcon={<span>suffix</span>}
        />

        <Picker locale={enUS} picker='week' />
        <Picker locale={enUS} picker='month' />
        <Picker locale={enUS} picker='quarter' />
        <Picker locale={enUS} picker='year' />

        <Picker locale={enUS} picker='time' />

        <div>
          <RangePicker
            locale={enUS}
            disabledDate={disabledDate}
            onChange={(v) => {
              console.log(v);
            }}
          />
          <br />
          <RangePicker
            showTime
            locale={enUS}
            disabledDate={disabledDate}
            onChange={(v) => {
              console.log(v);
            }}
          />
        </div>
        <PickerPanel
          locale={enUS}
          disabledDate={disabledDate}
          onChange={(v) => {
            console.log('a', v);
          }}
        />

        <div
          style={{
            maxWidth: 300,
            margin: '0 auto',
          }}
        >
          <Picker
            multiple
            locale={enUS}
            onChange={(v) => {
              console.log(v);
            }}
          />
          <Picker
            multiple
            maxTagCount='responsive'
            locale={enUS}
            onChange={(v) => {
              console.log(v);
            }}
          />
        </div>
        <div>
          <Picker
            showTime
            locale={enUS}
            onChange={(v) => {
              console.log(v);
            }}
          />
        </div>
      </div>
      <br />
      <br />
      <div>
        <h1>Select</h1>
        <Select
          defaultValue='lucy'
          style={{ width: 120 }}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
        <Select
          defaultValue='lucy'
          style={{ width: 120 }}
          disabled
          options={[{ value: 'lucy', label: 'Lucy' }]}
        />
        <Select
          defaultValue='lucy'
          style={{ width: 120 }}
          loading={true}
          options={[{ value: 'lucy', label: 'Lucy' }]}
        />
        <Select
          defaultValue='lucy'
          style={{ width: 120 }}
          allowClear
          options={[{ value: 'lucy', label: 'Lucy' }]}
        />
        <Select mode='tags' style={{ width: '100%' }} tokenSeparators={[',']} options={options} />
      </div>
      <br />
      <br />
      <div>
        <h1>Tooltip</h1>
        <div
          style={{
            width: 400,
            height: 400,
            overflow: 'scroll',
            background: 'gray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <Tooltip placement='top' overlay='HI asdas asdsa asdas asdas asdsa '>
              <span>Helloasdsadsad</span>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
