import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingGsneral';

function Footer() {
    const { settings } = useSettings();

    const logo = settings?.logo || 'https://via.placeholder.com/150';
    const phone = settings?.phone || '0000000000';
    const email = settings?.email || 'email@example.com';
    const address = settings?.address || 'Địa chỉ đang cập nhật';
    const copyright = settings?.copyright || '© 2025 Your Company';

    return (
        <footer className="footer">
            <div className="footer-top">
                <ul>
                    <li>
                        <Link to="/">
                            <img src={logo} alt="Logo" style={{ height: '50px' }} />
                        </Link>
                    </li>
                    <li><Link to="/contact">Liên hệ với chúng tôi</Link></li>
                    <li><Link to="/recruitment">Tuyển dụng</Link></li>
                    <li><Link to="/about">Giới thiệu</Link></li>
                    <li>
                        {/* Liên kết mạng xã hội */}
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="fab fa-facebook" aria-label="Facebook"></a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="fab fa-instagram" aria-label="Instagram"></a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="fab fa-youtube" aria-label="YouTube"></a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="fab fa-tiktok" aria-label="TikTok"></a>
                    </li>
                </ul>
            </div>

            <div className="footer-center">
                <p>
                    CÔNG TY TNHH IT CARE <br/>
                    Địa chỉ: {address} <br/>
                    Email: {email} <br/>
                    Đặt hàng online: <b>{phone}</b>
                </p>
            </div>

            <div className="footer-bottom">
                {copyright}
            </div>
        </footer>
    );
}

export default Footer;
