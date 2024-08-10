import { Icons } from "../assets";
import Routes from "../navigation/Routes";

const Constants = {
  googleApiKey: "",
  letImagePlaceholder: "https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
  Class:[
    { label: 'Mvc', value: 'Mvc' },
    { label: 'Eca', value: 'Eca' },
    { label: 'Applied Physics', value: 'Applied Physics' },
    

  ],
  DummyPicture:"https://media.istockphoto.com/id/1351445530/photo/african-student-sitting-in-classroom.jpg?s=612x612&w=0&k=20&c=1ICaZ03iFLzDmxfBkfDkmBGSgj1SDEpsM3eSDgB1KBk=",

  DrawerItems:[
    {
      id:1,
      name:'Home',
      icon:<Icons.Home/>,
      route:'Home'
    },
    {
      id:2,
      name:'Notifications',
      icon:<Icons.Notifications/>,
      // route:Routes.NOTIFICATION_SCREEN
      route:'Home'
    },
    {
      id:7,
      name:'Excused Attendance',
      icon:<Icons.ExcusedAttandance/>,
      // route:Routes.EXCUSE_ATTENDANCE
      route:'Home'
    },
    {
      id:3,
      name:'Terms & Conditions',
      icon:<Icons.TermsConditions/>,
      route:Routes.TERMS_AND_CONDITIONS
    },
    {
      id:4,
      name:'Privacy Policy',
      icon:<Icons.PrivacyPolicy/>,
      route:Routes.PRIVACY_POLICY
    },
    
  ]
};




export default Constants;
