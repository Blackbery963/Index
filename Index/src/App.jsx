import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { trackPageview, initGA } from '../Analytics.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
// Lazy load components
const Style = lazy(() => import('./Components/Style/Style'));
const Collection = lazy(() => import('./Components/Collections/Collection'));
const Diarytemp = lazy(() => import('./Components/Diarytemp/Diarytemp'));
const Connecting = lazy(() => import('./Components/Connecting/Connecting'));
const Creativity = lazy(() => import('./Components/Creativity/Creativity'));
const Commerce = lazy(() => import('./Components/Commerce/Commerce'))
const Visual = lazy(() => import('./Components/Visual/Visual'));
const Review = lazy(() => import('./Components/Review/Review'));
// Other imports remain the same...
import Account from './Components/Account/Account';
import Upload from './Components/Upload/Upload.jsx';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Gallery from './Components/Gallery/Gallery';
import Category from './Components/Category/Category';
import Landscape from './Sub-Components/Landscape';
import Still_life from './Sub-Components/Still_life';
import Oil_paint from './Sub-Components/Oil_paint';
import Water_color from './Sub-Components/Water_color';
import Abstract from './Sub-Components/Abstract';
import Modern from './Sub-Components/Modern';
import Diaryland from './Components/Diaryland/Diaryland';
import January from './DiaryService/January.jsx';
import About from './Company/About/About';
import Favourite from './Months/Favourite';
import FAQs from './Resources/FAQs/FAQs';
import Feedback from './Resources/Feedback/Feedback';
import Edit_Profile from './Components/Account/Edit_Profile/Edit_Profile';
import Dashboard from './Components/Account/Dashboard/Dashboard';
import Your_Collections from './Components/Account/Your_Collection/Your_Collections';
import Journal from './Components/Journal/Journal';
import Privacy_Policy from './Legal/Privacy_Policy/Privacy_Policy';
import Terms_Conditions from './Legal/Terms&Conditipons/Terms_Conditions.jsx';
import License from './Legal/License.jsx';
import ResetPassword from './Components/Login/ResetPassword';
import Cart from './Months/Cart';
import Help from './Resources/Help/Help.jsx';
import Artisan from './Components/Artisian/Artisian.jsx';
import Community from './Company/Community/Community.jsx';
import Nature from './Sub-Components/Nature.jsx';
import Traditional from './Sub-Components/Traditional.jsx';
import Realism from './Sub-Components/Realism.jsx';
import Minimalism from './Sub-Components/Minimalism.jsx';
import Impression from './Sub-Components/Impression.jsx';
import Surrealism from './Sub-Components/Surrealism.jsx';
import Digital from './Sub-Components/Digital.jsx';
import Pop from './Sub-Components/Pop.jsx';
import Portrait from './Sub-Components/Portrait.jsx';
import Historical from './Sub-Components/Histoirical';
import Express from './Sub-Components/Express.jsx';
import UserDiscoveryPage from './Components/Artisian/userDiscoveryPage.jsx';
import DiaryCollection from './Components/Diaryland/DiaryCollection.jsx';

// The commecial part starts from here 
import Artstore from './Arteva/Artstore.jsx';


function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      disable: 'mobile',
      easing: 'ease-out',
      offset: 100,
    });
  }, []);


    useEffect(() => {
      initGA();
    trackPageview(window.location.pathname);
  }, []);
const [diaryEntries, setDiaryEntries] = useState([]);
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center flex-col gap-y-4 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-[#040d12f5] min-h-screen">
              <Header />
              <Suspense fallback={<div className="text-center py-6 text-blue-600">Loading...</div>}>
                <div data-aos="fade-left" data-aos-delay="100" className="w-full will-change-transform will-change-opacity">
                  <Style />
                </div>
                <div data-aos="fade-right" data-aos-delay="200" className="w-full will-change-transform will-change-opacity">
                  <Collection />
                </div>
                <div data-aos="fade-left" data-aos-delay="300" className="w-full will-change-transform will-change-opacity">
                  <Diarytemp />
                </div>
                <div data-aos="fade-right" data-aos-delay="400" className="w-full will-change-transform will-change-opacity">
                  <Connecting />
                </div>
                <div data-aos="fade-left" data-aos-delay="400" className="w-full will-change-transform will-change-opacity">
                  <Creativity />
                </div>
                <div data-aos="fade-right" data-aos-delay="600" className="w-full will-change-transform will-change-opacity">
                  <Commerce />
                </div>
                <div data-aos="fade-left" data-aos-delay="700" className="w-full will-change-transform will-change-opacity">
                  <Visual />
                </div>
                <div data-aos="fade-right" data-aos-delay="800" className="w-full will-change-transform will-change-opacity">
                <Artisan />
                </div>
                <div data-aos="fade-left" data-aos-delay="900" className="w-full flex items-center justify-center flex-col gap-y-2">
                  <Review />
                </div>
                <div data-aos="fade-right" data-aos-delay="1000" className="w-full will-change-transform will-change-opacity">
                  <Footer />
                </div>
              </Suspense>
            </div>
          }
        />
        {/* Other routes remain the same */}
        <Route path="/Account" element={<Account />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/category" element={<Category />} />
        <Route path="/landscape" element={<Landscape />} />
        <Route path="/portrait" element={<Portrait />} />
        <Route path="/still-life" element={<Still_life />} />
        <Route path="/oil_paint" element={<Oil_paint />} />
        <Route path="/watercolor" element={<Water_color />} />
        <Route path="/abstract" element={<Abstract />} />
        <Route path="/historical" element={<Historical />} />
        <Route path="/modern" element={<Modern />} />
        <Route path="/diaryland" element={<Diaryland />} />
        <Route path="/january" element={<January />} />
        <Route path="/about" element={<About />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/resources/feedback" element={<Feedback />} />
        <Route path="/Account/Edit_profile" element={<Edit_Profile />} />
        <Route path="/Account/dashboard" element={<Dashboard />} />
        <Route path="/Account/Upload" element={<Upload />} />
        <Route path="/collections" element={<Your_Collections />} />
        <Route path="/Journal" element={<Journal />} />
        <Route path="/Legal/Privacy_Policy" element={<Privacy_Policy />} />
        <Route path="/Legal/Terms_Conditions" element={<Terms_Conditions />} />
        <Route path="/Legal/License" element={<License />} />
        <Route path="/Login/ResetPassword" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/History' element={<History/>}/>
        <Route path='/Resources/Help' element={<Help/>}/>
        <Route path="/community" element={<Community />} />
        <Route path='/Nature' element={<Nature/>}/>
        <Route path='/Traditional' element={<Traditional/>}/>
        <Route path='/Realism' element={<Realism/>}/>
        <Route path='/Minimalism' element={<Minimalism/>}/>
        <Route path='/Impressionism' element={<Impression/>}/>
        <Route path='/Surrealism' element={<Surrealism/>}/>       
        <Route path='/Digital' element={<Digital/>}/>
        <Route path='/Pop-Art' element={<Pop/>}/>
        <Route path='/Expressionism' element={<Express/>}/>
        <Route path='/Artist/discoverartists' element={<UserDiscoveryPage/>}/>
        <Route path='/Diaries/Diary-Collection' element={<DiaryCollection/>}/>
        <Route path='/diary/:id' element = {<January/>}/>

        {/* the routing of commercial section */}
        <Route path='/Arteva/ArtStore' element = {<Artstore/>}/>
      </Routes>
    </Router>
  );
}

export default App;