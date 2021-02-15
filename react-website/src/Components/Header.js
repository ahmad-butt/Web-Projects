import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import { ShoppingBasket } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
function Header() {
    const [{ basket, user }] = useStateValue();
    console.log(user?.email);
    const logout = () => {
        auth.signOut();
    }
    return (
        <div className='header'>
            <Link to='/'>
                <img src='http://pngimg.com/uploads/amazon/amazon_PNG25.png' alt='' className='header__logo' />
            </Link>
            <div className='header__search'>
                <input className='header__searchInput' type='text' />
                <SearchIcon className='header__searchIcon' />
            </div>
            <div className='header__nav'>
                <Link to={!user && '/login'} className='header__link'>
                    <div className='header__option'>
                        <span onClick={user && logout} className='header__linkOne'>
                            Hello, {user ? user.email : `Guest`}
                        </span>
                        <span onClick={user && logout} className='header__linkTwo'>
                            {!user ? `Sign In` : `Log out`}
                        </span>
                    </div>
                </Link>
                <Link to='/checkout' className='header__link'>
                    <div className='header__option'>
                        <span className='header__linkOne'>
                            Returns
                        </span>
                        <span className='header__linkTwo'>
                            & Orders
                        </span>
                    </div>
                </Link>
                <Link className='header__link'>
                    <div className='header__option'>
                        <span className='header__linkOne'>
                            Your
                        </span>
                        <span className='header__linkTwo'>
                            Prime
                        </span>
                    </div>
                </Link>
                <Link to='/checkout'>
                    <div className='header__optionBasket'>
                        <ShoppingBasket />
                        <span className='header__linkTwo header__basketCount'>{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
