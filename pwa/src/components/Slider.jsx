import React from 'react';
import Switch from 'react-switch';

const SwitchButton = ({isChecked, setIsChecked, cliente}) => {

  const handleToggle = () => {
    setIsChecked(!isChecked);
    if(isChecked){
      cliente.publish('Bombilla/intermedias', "1")
    }else{
      cliente.publish('Bombilla/intermedias', "0")
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Switch
        checked={isChecked}
        onChange={handleToggle}
        onColor="#4caf50"
        offColor="#e30724"
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
