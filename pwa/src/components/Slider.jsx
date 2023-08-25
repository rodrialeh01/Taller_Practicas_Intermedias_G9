import React, { useState } from 'react';
import Switch from 'react-switch';

const SwitchButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Switch
        checked={isChecked}
        onChange={handleToggle}
        onColor="#4caf50"
        offColor="#f44336"
        onHandleColor="#ffffff"
        offHandleColor="#ffffff"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
      />
      <p>{isChecked ? 'Encendido' : 'Apagado'}</p>
    </div>
  );
};

export default SwitchButton;
