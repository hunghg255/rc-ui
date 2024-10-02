/* eslint-disable no-console */
import './App.css';
import { useState } from 'react';

import Modal from '@rc-ui/dialog';
import { Picker, PickerPanel, RangePicker } from '@rc-ui/picker';

import enUS from 'rc-picker/lib/locale/en_US';
import 'dayjs/locale/vi';

import '@rc-ui/base/style.css';
import '@rc-ui/dialog/style.css';
import '@rc-ui/picker/style.css';

function App() {
  const [visible, setVisible] = useState(false);

  function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  }

  return (
    <>
      <div>
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

      <div>
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

        <RangePicker
          locale={enUS}
          disabledDate={disabledDate}
          onChange={(v) => {
            console.log(v);
          }}
        />
        <PickerPanel
          locale={enUS}
          disabledDate={disabledDate}
          onChange={(v) => {
            console.log('a', v);
          }}
        />
      </div>
    </>
  );
}

export default App;
