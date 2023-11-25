import './Aboutus.css';
import styles2 from '../Main/Footer.module.css';
import footerlogo from '../Assets/main/footerlogo.png';
import fb from '../Assets/main/fb.png';
import x from '../Assets/main/x.png';
import yt from '../Assets/main/yt.png';
import insta from '../Assets/main/insta.png';
import newsletterpic from '../Assets/newsletterpic.png';
import headerlogo from '../Assets/aboutus/headerlogo.png';
import profile from '../Assets/aboutus/profile.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutUssection = () => {
    return (
        <div className='aboutuspart'>
            <div className='title'>About Routier</div>
            <div className='aboutustext'>
                <p>Welcome to Routier, your trusted companion on the journey of exploration and discovery. 
                    At Routier, we are passionate about travel and dedicated to helping you create unforgettable 
                    experiences.Whether you're a seasoned globetrotter or embarking on your first adventure, 
                    our mission is to provide you with the guidance, inspiration, and resources you need to 
                    make every trip remarkable.
                </p>
                <br />
                <p>
                    Our team of travel experts and enthusiasts curate a world of possibilities, offering you 
                    carefully crafted itineraries, insightful tips, and expert advice to ensure your 
                    travels are as seamless as they are unforgettable. We understand that each traveler is unique, so we strive 
                    to cater to a diverse range of interests, from cultural excursions to outdoor adventures 
                    and everything in between.
                </p>
                <br />
                <p>
                    Routier is not just a website; it's a community of like-minded explorers who share a 
                    common love for wanderlust. Join us on this incredible journey, and let us be your compass 
                    in the world of travel. Discover new horizons, create lifelong memories, and let Routier 
                    be your trusted guide as you explore the beauty and diversity of our incredible planet. 
                    Come, let's wander together. Your adventure starts here with Routier.
                </p>
                <br/>
            </div>
        </div>
    );
};
  
const OurTeamsection = () => {
    return (
        <div className='ourteam'>
            <div className='title'>
            Our team
            </div>

            <div className='profilespart'>
                <div className='profilecard'>
                    <img src={profile} alt='profile' className='profilepic'></img>
                    <div className='nametext'>Anuj Contractor</div>
                    <div className='idtext'>202101110</div>
                </div>
                <div className='profilecard'>
                    <img src={profile} alt='profile'className='profilepic'></img>
                    <div className='nametext'>Dharmin Patel</div>
                    <div className='idtext'>202101147</div>
                </div>
                <div className='profilecard'>
                    <img src={profile} alt='profile'className='profilepic'></img>
                    <div className='nametext'>Bansri Patel</div>
                    <div className='idtext'>202101097</div>
                </div>
                <div className='profilecard'>
                    <img src={profile} alt='profile' className='profilepic'></img>
                    <div className='nametext'>Shwet Patel</div>
                    <div className='idtext'>202101109</div>
                </div>
                <div className='profilecard'>
                    <img src={profile} alt='profile' className='profilepic'></img>
                    <div className='nametext'>Het Patel</div>
                    <div className='idtext'>202101162</div>
                </div>
                <div className='profilecard'>
                    <img src={profile} alt='profile' className='profilepic'></img>
                    <div className='nametext'>Mann Kataria</div>
                    <div className='idtext'>202101114</div>
                </div>
                <div className='profilecard'>
                    <img src={profile} alt='profile' className='profilepic'></img>
                    <div className='nametext'>Aditya Makawana</div>
                    <div className='idtext'>202101165</div>
                </div>
                <div className='profilecard'>
                    <img src={profile} alt='profile' className='profilepic'></img>
                    <div className='nametext'>Priyanshu Gagia</div>
                    <div className='idtext'>202101165</div>
                </div>
                <div className='profilecard'>
                    <img src={profile} alt='profile' className='profilepic'></img>
                    <div className='nametext'>Poojan Shah</div>
                    <div className='idtext'>202101132</div>
                </div>
                <div className='profilecard'>
                    <img src={profile} alt='profile' className='profilepic'></img>
                    <div className='nametext'>Harsh Mungara</div>
                    <div className='idtext'>202101130</div>
                </div>
                <div className='profilecard'>
                    <img src={profile} alt='profile' className='profilepic'></img>
                    <div className='nametext'>Visvas solanki</div>
                    <div className='idtext'>202101138</div>
                </div>
                <div className='profilecard'>
                    <img src={profile} alt='profile' className='profilepic'></img>
                    <div className='nametext'>Meet Panchal</div>
                    <div className='idtext'>Mentor</div>
                </div>
            </div>
        
        </div>
    );
};

function Aboutus() {
    const [selectedOption, setSelectedOption] = useState('aboutUs');
    
    const handleToggle = (option) => {
        setSelectedOption(option);
    };

    return(
        <>
        <div className='header'>
            <div className='titlepart'>
                <img src={headerlogo} alt='logo' className='headerlogo'></img>
                <div className='text'>routier</div>
            </div>
            <a href='./' className='redirecttext'>go back to home page</a>
        </div>


        <div className='imagesection'>
            <div className='presenting'>Presenting</div>
            <div className='aboutustext'>ABOUT US</div>
            
        </div>

        <div className='togglebarwrapper'>
            <div className='togglebar'>
                <button 
                    onClick={() => handleToggle('aboutUs')} 
                    className={selectedOption === 'aboutUs' ? 'ButtonWhenSelectedA' : 'ButtonWhenNotSelectedA'}
                    >About Us</button>
                <button 
                    onClick={() => handleToggle('ourTeam')} 
                    className={selectedOption === 'ourTeam' ? 'ButtonWhenSelectedB' : 'ButtonWhenNotSelectedB'}
                    >Our Team</button>
            </div>
            
        </div>

        {selectedOption === 'aboutUs' ? <AboutUssection /> : <OurTeamsection />}

    
        <div className='footerforaboutus'>

        <div className={styles2.footer}>
        <div className={styles2.newsletter}>
          <img src={newsletterpic} alt='newsletter'></img>
        </div>
        
        
        <div className={styles2.aboutus}>
          
          <div className={styles2.footerlogoblock}>
            <img src= {footerlogo} alt ="logo" className={styles2.footerlogopic}></img>
            <div>
                <div className={styles2.footerroutier}>Routier</div>
                <div className={styles2.icons}>
                <img src={fb} alt='fb'></img>
                <img src={x} alt='x'></img>
                <img src={yt} alt='yt'></img>
                <img src={insta} alt='insta'></img>
                </div>
            </div>
          </div>

          <div className={styles2.footertextblockcover}>
              <div className={styles2.footertextblock}>
                <div className={styles2.footertexttitle} >About us</div>
                <Link className={styles2.footernormaltext} to="/aboutus">What is Routier?</Link>
                <Link className={styles2.footernormaltext} to="/aboutus">Our Team</Link>
              </div>

            </div>
        </div>
      </div>
        </div>
        </>
    );
}

export default Aboutus;