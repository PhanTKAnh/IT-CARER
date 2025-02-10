import { DownOutlined } from '@ant-design/icons';
function DropDown() {
    const handleOnclick = () =>{
        const dropdown = document.querySelector(".dropdown-content");
        dropdown.classList.toggle("show")
        console.log(dropdown)
    }
    return (
        <>
            <button onClick={handleOnclick} className="dropbtn">
                <img alt="avatar" height="28" width="28"  src="https://static.careerlink.vn/web/images/common/avatar_placeholder.png" />
                <p> Đăng ký <DownOutlined /></p>

            </button>
            <div id="myDropdown" className="dropdown-content">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </div>
        </>
    )
}
export default DropDown;