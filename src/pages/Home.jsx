import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlassMinus,faBell,faHouse,faWindowMaximize,faArrowUpWideShort,faUser} from '@fortawesome/free-solid-svg-icons'
export default function Home(){
    return (
        <>
        <div className='Home-container'>
            <header className='Home-head'>
                 <div className='Home-head1'> <img src='/images/Crop.webp' className='Home-head-img' /> Direct Market Accesss
                 <div className='Home-search-container'><input type='text' placeholder='  Search' className='Home-search'/>
                   <FontAwesomeIcon icon={faMagnifyingGlassMinus} /> <FontAwesomeIcon icon={faBell}  className='Home-bell'/></div>
               
                  </div>
                 
                 </header>  
                 <nav className='Home-nav'>
                     <div> <div className='Home-nav-icon'><FontAwesomeIcon icon={faHouse}  /></div>  <div className='Home-nav-text'>Home</div></div> 
                     <div> <div className='Home-nav-icon'><FontAwesomeIcon icon={faWindowMaximize} /></div> <div className='Home-nav-text'>Browse</div></div>
                     <div> <div className='Home-nav-icon'><FontAwesomeIcon icon={faArrowUpWideShort} /></div> <div className='Home-nav-text'>Oders</div></div> 
                     <div> <div className='Home-nav-icon'><FontAwesomeIcon icon={faUser} /></div><div className='Home-nav-text'>Profile</div> </div>
                 </nav>

            <div></div>         
        </div>
        </>
    )
}