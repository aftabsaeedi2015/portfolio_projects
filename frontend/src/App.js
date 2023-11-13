import './App.css';
import * as React from 'react';
import Header from './components/header/Header';
import Body from './components/body/body'
import HomePage from './components/body/home/homePage';
import Footer from './components/footer/Footer';
import ClassPricing from './components/body/gymclasses/classes';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Runningman from './components/styledComponents/runningman'
import runningman from './assets/runningman.gif'
import whitemanrunning from './assets/whitemanrunning.gif'
import { useMediaQuery } from '@mui/material'
import {useTheme} from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import Signup from './components/body/signup/signup';
import Pricing from './components/body/pricing/pricingPage'
import AboutPage from './components/body/about/aboutPage';
import Contactus from './components/body/contactus/contactus';
import Blog from './components/body/blog/blog';
import Membership from './components/body/membership/membership';
import DateSelection from './components/body/dateSelection/dateSelection';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Payment from './components/body/payment/payment'
import BlogReadMore from './components/body/blog/blogReadMore';


const gymClasses = [
  {
    title: 'Cardio',
    description: 'At our cutting-edge facility, we are committed to helping you achieve peak cardiovascular health and unlock the full potential of your body. Our cardio fitness program is designed to cater to all fitness levels, from beginners to seasoned athletes.',
    id: 1
  },
  {
    title: 'Aerobic',
    description: "Are you looking to boost your fitness, improve your cardiovascular health, and have a blast while doing it? Look no further than [Gym Name] for the ultimate aerobics experience Our state-of-the-art gym is proud to offer a wide range of exhilarating aerobics classes",
    id: 2
  },
  {
    title: 'Boxing',
    description: '"Unleash Your Inner Champion with Boxing Coaching at [Boxing Gym Name] Do you have the heart of a fighter, the spirit of a champion, and the desire to become the best version of yourself? Look no further than [Boxing Gym Name] for world-class boxing coaching',
    id: 3
  }
]


function App() {
  var mobileSize = useMediaQuery(useTheme().breakpoints.up('lg'));
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch({type : 'logout'})
  },[])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className='App'>
      {mobileSize===true?
      <>
      <Runningman source={runningman} speed={8.8} ease={'linear'} height={'55px'}/>
      <Runningman source={whitemanrunning} speed={9} height={'60px'}/>
      </>:null
     }
      <video loop autoPlay muted id='bgVideo'>
            <source src = {require('./components/body/home/bgVideo.mp4')} type='video/mp4' />
        </video>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/classes' element={<ClassPricing gymClasses={gymClasses}/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/aboutus' element={<AboutPage/>}/>
        <Route path='/contactus' element={<Contactus/>}/>
        <Route path ='/blog' element={<Blog/>}/>
        <Route path = '/membership' element={<Membership/>}/>
        <Route path = '/:session/dateselection' element = {<DateSelection/>}/>
        <Route path = '/:classorplan/payment' element = {<Payment/>}/>
        <Route path = '/readBlogMore/:id' element = {<BlogReadMore/>}/>
      </Routes>
      {/* <Footer/> */}
      </BrowserRouter>
      </div>
      </LocalizationProvider>
  );
}

export default App;
