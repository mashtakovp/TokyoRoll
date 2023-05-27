import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Панель администратора</Link>
                    </li>

                    <li>
                        <a href="#rollSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Роллы</a>
                        <ul className="collapse list-unstyled" id="rollSubmenu">
                            <li>
                                <Link to="/admin/rolls"><i className="fa fa-clipboard"></i> Все</Link>
                            </li>

                            <li>
                                <Link to="/admin/roll"><i className="fa fa-plus"></i> Создать</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Заказы</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Пользователи</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Отзывы</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
