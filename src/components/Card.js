import QRCode from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import './style.css';

export const Card = () => {
  const firstLoad = useRef(true);
  const [qrvalue, setQrvalue] = useState('');
  const [network, setNetwork] = useState({
    ssid: '',
    password: '',
  });
  const [portrait, setPortrait] = useState(false);

  const escape = (v) => {
    const needsEscape = ['"', ';', ',', ':', '\\'];

    let escaped = '';
    for (let i = 0; i < v.length; i++) {
      let c = v[i];
      if (needsEscape.includes(c)) {
        c = '\\' + c;
      }
      escaped += c;
    }

    return escaped;
  };

  const onPrint = () => {
    if (network.password.length < 8) {
      alert('密码必须至少8位数');
    } else {
      window.print();
    }
  };

  useEffect(() => {
    if (firstLoad.current && window.innerWidth < 500) {
      firstLoad.current = false;
      setPortrait(true);
    }

    const ssid = escape(network.ssid);
    const password = escape(network.password);
    setQrvalue(`WIFI:T:WPA;S:${ssid};P:${password};;`);
  }, [network]);

  return (
    <div>
      <fieldset
        id="print-area"
        style={{ maxWidth: portrait ? '350px' : '100%' }}
      >
        <h1 contenteditable="true" style={{ textAlign: portrait ? 'center' : 'left' }}>WiFi 登陆</h1>

        <div
          className="details"
          style={{ flexDirection: portrait ? 'column' : 'row' }}
        >
          <QRCode
            className="qrcode"
            style={{ paddingRight: portrait ? '' : '1em' }}
            value={qrvalue}
            size={175}
          />

          <div className="inputs">
            <label contenteditable="true">网络名称</label>
            <textarea
              id="ssid"
              type="text"
              maxLength="32"
              placeholder="WiFi 网络名称"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              value={network.ssid}
              onChange={(e) => setNetwork({ ...network, ssid: e.target.value })}
            />
            <label contenteditable="true">密码</label>
            <textarea
              id="password"
              type="text"
              style={{
                height:
                  portrait && network.password.length > 40 ? '5em' : 'auto',
              }}
              maxLength="63"
              placeholder="密码"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              value={network.password}
              onChange={(e) =>
                setNetwork({ ...network, password: e.target.value })
              }
            />
          </div>
        </div>

        <p contenteditable="true">
          <span role="img" aria-label="mobile-phone">
            📸📱
          </span>
          扫描二维码即可自动连接 WiFi
        </p>
      </fieldset>

      <div className="buttons">
        <button id="rotate" onClick={() => setPortrait(!portrait)}>
          旋转
        </button>
        <button id="print" onClick={onPrint}>
          打印
        </button>
      </div>
    </div>
  );
};
