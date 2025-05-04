import {Icons, Images} from '../assets';
import {UtilityMethods} from '../utility';

export const UserTypes = [
  {
    id: 1,
    name: 'Student',
  },
  {
    id: 2,
    name: 'Instructor',
  },
];

export const genders = [
  {label: 'Male', value: 'MALE'},
  {label: 'Female', value: 'FEMALE'},
];

export const attendanceData = [
  {
    id: '1',
    status: 'Present',
    className: 'ABCD',
    dateTime: 'Thu 4:30 PM, Mar 23, 2024',
  },
  {
    id: '2',
    status: 'Absent',
    className: 'XYZ',
    dateTime: 'Fri 10:00 AM, Mar 24, 2024',
  },
  // Add more data as needed
];

export const attendanceListData = [
  {
    name: 'John Doe',
    netId: 'XYZ',
    status: 'Present',
    dateTime: 'Dec 28, 2024, 8:25 PM',
    location: 'Harvard, New York',
  },
  {
    name: 'Jane Smith',
    netId: 'ABC',
    status: 'Absent',
    dateTime: 'Jan 10, 2025, 10:30 AM',
    location: 'Stanford, California',
  },
];

export const dummyExcuseData = [
  {
    _id: '669e3c8bc37c5c9fd452b6e2',
    name: 'FYP',
    semester: 1,
    schedule: {
      date: '2024-07-25T00:00:00.000Z',
      startTime: '17:03',
      endTime: '18:03',
      _id: '669e3d97bc7054a17312a6e2',
    },
    createdBy: 'Abdul Basit',
    geoTracking: 'disable',
    excusedAbsenceAllowance: 2,
    enrolledStudents: [
      '669e3c4a7b6d2e298db17884',
      '669e3c1f6304f2fb428bfa5d',
      '669e3c37343c808d5dfe0526',
    ],
    __v: 0,
  },
];

export const particularDatesdummyExcuseData = [
  {
    _id: '669e3c8bc37c5c9fd452b6e2',
    name: 'Advanced Data Structures & Algorithm Analysis',
    semester: 1,
    schedule: {
      date: '2024-07-25T00:00:00.000Z',
      startTime: '17:03',
      endTime: '18:03',
      _id: '669e3d97bc7054a17312a6e2',
    },
    createdBy: 'Abdul Basit',
    geoTracking: 'disable',
    excusedAbsenceAllowance: 2,
    enrolledStudents: [
      '669e3c4a7b6d2e298db17884',
      '669e3c1f6304f2fb428bfa5d',
      '669e3c37343c808d5dfe0526',
    ],
    __v: 0,
  },
  {
    _id: '669e3c8bc37c5c9fd452b6e3',
    name: 'FYP',
    semester: 1,
    schedule: {
      date: '2024-07-25T00:00:00.000Z',
      startTime: '17:03',
      endTime: '18:03',
      _id: '669e3d97bc7054a17312a6e2',
    },
    createdBy: 'Abdul Basit',
    geoTracking: 'disable',
    excusedAbsenceAllowance: 2,
    enrolledStudents: [
      '669e3c4a7b6d2e298db17884',
      '669e3c1f6304f2fb428bfa5d',
      '669e3c37343c808d5dfe0526',
    ],
    __v: 0,
  },
  {
    _id: '669e3c8bc37c5c9fd452b6e4',
    name: 'FYP final year',
    semester: 1,
    schedule: {
      date: '2024-07-25T00:00:00.000Z',
      startTime: '17:03',
      endTime: '18:03',
      _id: '669e3d97bc7054a17312a6e2',
    },
    createdBy: 'Abdul Basit',
    geoTracking: 'disable',
    excusedAbsenceAllowance: 2,
    enrolledStudents: [
      '669e3c4a7b6d2e298db17884',
      '669e3c1f6304f2fb428bfa5d',
      '669e3c37343c808d5dfe0526',
    ],
    __v: 0,
  },
];

export const notifications = [
  {
    id: '1',
    title: 'Excused Absence',
    message: 'Your Excused Absence request has been approved',
  },
  {
    id: '2',
    title: 'Excused Absence',
    message: 'Your Excused Absence request has been approved',
  },
  {
    id: '3',
    title: 'Excused Absence',
    message: 'Your Excused Absence request has been approved',
  },
  {
    id: '4',
    title: 'Excused Absence',
    message: 'Your Excused Absence request has been approved',
  },
  {
    id: '5',
    title: 'Excused Absence',
    message: 'Your Excused Absence request has been approved',
  },
  {
    id: '6',
    title: 'Excused Absence',
    message: 'Your Excused Absence request has been approved',
  },
];

export const attemptsData = [
  {label: '1 Time', value: '1'},
  {label: '2 Times', value: '2'},
  {label: '3 Times', value: '3'},
];

export const expiryData = [
  {label: '1 Minute', value: '1'},
  {label: '5 Minutes', value: '5'},
  {label: '10 Minutes', value: '10'},
];

export const CACHE_CLEAR_INTERVAL = 86400000;

export const DummyBooksData = [
  {
    id: 0,
  },
  {
    id: 1,
    title: 'The Magical Adventures of Sunny the Squirrel',
    image: Images.BOOK_1,
    createdAt: new Date('2024-08-08T10:00:00Z'),
    member: {_id: '1', name: 'Markram'},
  },
  {
    id: 2,
    title: 'The Enchanted Forest',
    image: Images.BOOK_2,
    createdAt: new Date('2024-08-05T14:30:00Z'),
    member: {_id: '2', name: 'John'},
  },
  {
    id: 3,
    title: 'Journey to the Moonlit Meadow',
    image: Images.BOOK_3,
    createdAt: new Date('2024-07-15T09:00:00Z'),
    member: {_id: '1', name: 'Markram'},
  },
  {
    id: 4,
    title: 'Mysteries of the Deep Sea',
    image: Images.BOOK_2,
    createdAt: new Date('2024-07-01T12:00:00Z'),
    member: {_id: '3', name: 'Alice'},
  },
  {
    id: 5,
    title: 'The Lost Treasure of Pirate Cove',
    image: Images.BOOK_1,
    createdAt: new Date('2024-08-09T08:00:00Z'),
    member: {_id: '2', name: 'John'},
  },
  {
    id: 6,
    title: 'The Whispering Winds',
    image: Images.BOOK_1,
    createdAt: new Date('2024-08-10T07:30:00Z'),
    member: {_id: '3', name: 'Alice'},
  },
  {
    id: 7,
    title: 'The Talking Tree',
    image: Images.BOOK_3,
    createdAt: new Date('2024-07-30T16:00:00Z'),
    member: {_id: '1', name: 'Markram'},
  },
  {
    id: 8,
    title: 'A Day in the Life of a Bee',
    image: Images.BOOK_2,
    createdAt: new Date('2024-08-07T15:00:00Z'),
    member: {}, // No member associated
  },
];

export const membersData = [
  {_id: 'all', name: 'All', svg: Icons.AllMembers},
  {_id: '1', name: 'Markram', image: Images.MEMBER_1},
  {_id: '2', name: 'John', image: Images.MEMBER_2},
  {_id: '3', name: 'Alice', image: Images.MEMBER_3},
];

export const PhysicalBooks = [
  {
    id: 1,
    title: 'The Magical Adventures of Sunny the Squirrel',
    image: Images.BOOK_1,
    createdAt: new Date('2024-08-08T10:00:00Z'),
    member: {_id: '1', name: 'Markram'},
  },
  {
    id: 2,
    title: 'The Enchanted Forest',
    image: Images.BOOK_2,
    createdAt: new Date('2024-08-05T14:30:00Z'),
    member: {_id: '2', name: 'John'},
  },
  {
    id: 3,
    title: 'Journey to the Moonlit Meadow',
    image: Images.BOOK_3,
    createdAt: new Date('2024-07-15T09:00:00Z'),
    member: {_id: '1', name: 'Markram'},
  },
  {
    id: 4,
    title: 'Mysteries of the Deep Sea',
    image: Images.BOOK_2,
    createdAt: new Date('2024-07-01T12:00:00Z'),
    member: {_id: '3', name: 'Alice'},
  },
  {
    id: 5,
    title: 'The Lost Treasure of Pirate Cove',
    image: Images.BOOK_1,
    createdAt: new Date('2024-08-09T08:00:00Z'),
    member: {_id: '2', name: 'John'},
  },
];

export const dummyAddresses = [
  {
    id: '1',
    title: 'Home',
    address: '123 Main St, Springfield, IL\nApt 4B',
    locationIcon: <Icons.address width={24} height={24} />,
    editIcon: <Icons.EditIcon width={24} height={24} />,
  },
  {
    id: '2',
    title: 'Work',
    address: '456 Market St, Metropolis, IL\nSuite 300',
    locationIcon: <Icons.address width={24} height={24} />,
    editIcon: <Icons.EditIcon width={24} height={24} />,
  },
  {
    id: '3',
    title: 'Gym',
    address: '789 Broadway St, Gotham, NY\nFloor 1',
    locationIcon: <Icons.address width={24} height={24} />,
    editIcon: <Icons.EditIcon width={24} height={24} />,
  },
];

export const membersDataList = [
  {
    id: '1',
    name: 'Markram',
    email: 'markram555@gmail.com',
    status: 'Connected',
    imageSource: Images.MEMBER_1, // Replace with actual image path
  },
  {
    id: '2',
    name: 'Alice',
    email: 'alice123@gmail.com',
    status: 'Pending',
    imageSource: Images.MEMBER_1, // Replace with actual image path
  },
  {
    id: '3',
    name: 'John',
    email: 'john_doe@gmail.com',
    status: 'Disconnected',
    imageSource: Images.MEMBER_1, // Replace with actual image path
  },
  {
    id: '4',
    name: 'Emily',
    email: 'emily_roberts@gmail.com',
    status: 'Connected',
    imageSource: Images.MEMBER_2, // Replace with actual image path
  },
  {
    id: '5',
    name: 'David',
    email: 'david_wilson@gmail.com',
    status: 'Pending',
    imageSource: Images.MEMBER_3, // Replace with actual image path
  },
  {
    id: '6',
    name: 'Mark',
    email: 'mark_wilson@gmail.com',
    status: 'Connected',
    imageSource: Images.MEMBER_3, // Replace with actual image path
  },
];

export const notificationData = [
  {
    id: '1',
    name: 'Markram',
    avatar: 'https://via.placeholder.com/150', // Replace with actual image URL or use a local image
  },
  {
    id: '2',
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Jane Smith',
    avatar: 'https://via.placeholder.com/150',
  },
];

export const audioData = [
  {
    id: '1',
    user: {name: 'Markram', avatar: Images.MEMBER_1},
    audioUri:
      'https://file-examples.com/storage/fe519944ff66ba53b99c446/2017/11/file_example_MP3_700KB.mp3',
    duration: 120000, // Example duration in milliseconds
  },
  // Add more audio data here
];

export const menu = [
  {
    label: 'Save',
    value: 'save',
    icon: (
      <Icons.DownloadIcon
        width={UtilityMethods.wp(6)}
        height={UtilityMethods.wp(6)}
      />
    ),
  },
  {
    label: 'Delete',
    value: 'delete',
    icon: (
      <Icons.DeleteBlackIcon
        width={UtilityMethods.wp(5)}
        height={UtilityMethods.wp(5)}
      />
    ),
  },
  {
    label: 'Send to recorder',
    value: 'sync',
    icon: (
      <Icons.syncIcon
        width={UtilityMethods.wp(5)}
        height={UtilityMethods.wp(5)}
      />
    ),
  },
];

export const bookPreviewDotNenu = [
  {
    label: 'Share with members',
    value: 'share',
    icon: (
      <Icons.shareIcon
        width={UtilityMethods.wp(6)}
        height={UtilityMethods.wp(6)}
      />
    ),
  },
  {
    label: 'Edit',
    value: 'edit',
    icon: (
      <Icons.EditIcon
        width={UtilityMethods.wp(6)}
        height={UtilityMethods.wp(6)}
      />
    ),
  },
  {
    label: 'Save to phone',
    value: 'save',
    icon: (
      <Icons.DownloadIcon
        width={UtilityMethods.wp(6)}
        height={UtilityMethods.wp(6)}
      />
    ),
  },
  {
    label: 'Upload',
    value: 'upload',
    icon: (
      <Icons.uploadIconBlack
        width={UtilityMethods.wp(5)}
        height={UtilityMethods.wp(5)}
      />
    ),
  },
  {
    label: 'Delete',
    value: 'delete',
    icon: (
      <Icons.DeleteBlackIcon
        width={UtilityMethods.wp(5)}
        height={UtilityMethods.wp(5)}
      />
    ),
  },
];
