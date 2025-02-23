import { DownOutlined, HeartOutlined, ReconciliationOutlined, SendOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import logo from '../../asset/image/logo.png';

function DropDown() {
    const handleOnclick = () => {
        const dropdown = document.querySelector("#myDropdown");
        if (dropdown) {
            dropdown.classList.toggle("show");
            console.log(dropdown);
        }
    };

    return (
        <>
            <button onClick={handleOnclick} className="dropbtn">
                <img 
                    alt="avatar" 
                    height="28" 
                    width="28"  
                    src="https://static.careerlink.vn/web/images/common/avatar_placeholder.png" 
                />
                <p>Đăng ký <DownOutlined /></p>
            </button>
            <div id="myDropdown" className="dropdown-content">
                <div className='inner-head'>
               <NavLink to="/nguoi-tim-viec/login"> <button className='btn-1'>Đăng nhập</button></NavLink>
               <NavLink to="/nguoi-tim-viec/register" > <button  className='btn-2'> Đăng ký </button></NavLink>
                </div>
                <div className='inner-content'>
                    <div className='inner-left'>
                    <div className='inner-logo'>
                    <img src={logo} alt="Logo" />

                    </div>
                    </div>
                    <div className='inner-right'>
                        <p> <ReconciliationOutlined /> Hồ sơ xin việc </p>
                        <p> <HeartOutlined /> Việc đã lưu</p>
                        <p> <SendOutlined /> Việc đã ứng tuyển</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DropDown;
