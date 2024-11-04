import React, { useState } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

axios.defaults.baseURL = 'http://localhost:4000'; // Replace with your API base URL


const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [picture, setPicture] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const [otp, setOTP] = useState();
    const [verified, setVerified] = useState(false);
    const [send, setSend] = useState(false);
    const [check, setCheck] = useState();

    const handleClick = () => setShow(!show);
   
    const sendHandler = async () => {
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const { data } = await axios.post("/api/user/sendOTP", {
                email
            }, config);

            toast({
                title: 'OTP sent',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            console.log(data);
            setCheck(data.sent);
            setSend(true);
            setLoading(false);
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response.data.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setSend(true);
            setLoading(false);
        }
    }

    const handleOTP = async () => {
        //check at FE itself
        if(otp===check){
            toast({
                title: 'Verified',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setVerified(true);
        }
        else{
            toast({
                title: 'Incorrect OTP',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        }
    }

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: 'Please Select an Image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        }

        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "MERN Chat App");
            data.append("cloud_name", "dsbhevxvs");
            fetch('https://api.cloudinary.com/v1_1/dsbhevxvs/image/upload', {
                method: 'POST',
                body: data
            }).then(res => res.json())
              .then(data => {
                setPicture(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
              })
              .catch(err => {
                console.log(err);
                setLoading(false);
              });
        } else {
            toast({
                title: 'Please Select an Image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }
    };

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }

        if (password !== confirmpassword) {
            toast({
                title: 'Passwords do not Match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const { data } = await axios.post("/api/user", {
                name,
                email,
                password,
                picture
            }, config);

            toast({
                title: 'Registration Successful!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push('/chats');
        } catch (error) {
            toast({
                title: 'Error Occurred!',
                description: error.response.data.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
        }
    };

    return (
        <VStack spacing='5px'>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Enter Your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Confirm Password'
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='pic'>
                <FormLabel>Upload your Picture</FormLabel>
                <Input 
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            {send ? (
                <>
                <FormControl id='otp' isRequired>
                <FormLabel>Enter OTP</FormLabel>
                <InputGroup size='md'>
                    <Input
                        placeholder='******'
                        onChange={(e) => setOTP(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleOTP}>
                            Verify OTP
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme='blue'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
                isDisabled={!verified}
            >
                Sign Up
            </Button>
            </>
                
            ) : (
            <Button
                colorScheme='blue'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={sendHandler}
                isLoading={loading}
            >
                SendOTP
            </Button>
            )}
        </VStack>
    );
}

export default Signup;



// import React, { useState } from 'react';
// import { FormControl, FormLabel } from '@chakra-ui/form-control';
// import { VStack } from '@chakra-ui/layout';
// import { Button } from '@chakra-ui/button';
// import { useToast } from '@chakra-ui/react';
// import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// const BASE_URL = 'http://localhost:3001';

// const Signup = () => {
//     const [show, setShow] = useState(false);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [confirmpassword, setConfirmpassword] = useState('');
//     const [password, setPassword] = useState('');
//     const [picture, setPicture] = useState('');
//     const [loading, setLoading] = useState(false);
//     const toast = useToast();
//     const history = useHistory();

//     const handleClick = () => setShow(!show);

//     const postDetails = (pics) => {
//         setLoading(true);
//         if (pics === undefined) {
//             toast({
//                 title: 'Please Select an Image!',
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: "bottom"
//             });
//             setLoading(false);
//             return;
//         }

//         if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
//             const data = new FormData();
//             data.append("file", pics);
//             data.append("upload_preset", "MERN Chat App");
//             data.append("cloud_name", "dsbhevxvs");

//             fetch('https://api.cloudinary.com/v1_1/dsbhevxvs/image/upload', {
//                 method: 'POST',
//                 body: data
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     setPicture(data.url.toString());
//                     console.log(data.url.toString());
//                     setLoading(false);
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     setLoading(false);
//                 });
//         } else {
//             toast({
//                 title: 'Please Select an Image!',
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: "bottom"
//             });
//             setLoading(false);
//             return;
//         }
//     };

//     const submitHandler = async () => {
//         setLoading(true);
//         if (!name || !email || !password || !confirmpassword) {
//             toast({
//                 title: 'Please fill all the fields',
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: "bottom"
//             });
//             setLoading(false);
//             return;
//         }

//         if (password !== confirmpassword) {
//             toast({
//                 title: 'Passwords do not Match',
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: "bottom"
//             });
//             setLoading(false);
//             return;
//         }

//         try {
//             const config = {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     name,
//                     email,
//                     password,
//                     picture
//                 })
//             };

//             const response = await fetch(`${BASE_URL}/api/user`, config);
//             const data = await response.json();

//             if (response.ok) {
//                 toast({
//                     title: 'Registration Successful!',
//                     status: 'success',
//                     duration: 5000,
//                     isClosable: true,
//                     position: "bottom"
//                 });
//                 localStorage.setItem('userInfo', JSON.stringify(data));
//                 setLoading(false);
//                 history.push('/chats');
//             } else {
//                 toast({
//                     title: 'Error Occurred!',
//                     description: data.message,
//                     status: 'warning',
//                     duration: 5000,
//                     isClosable: true,
//                     position: "bottom"
//                 });
//                 setLoading(false);
//             }
//         } catch (error) {
//             toast({
//                 title: 'Error Occurred!',
//                 description: 'Something went wrong',
//                 status: 'warning',
//                 duration: 5000,
//                 isClosable: true,
//                 position: "bottom"
//             });
//             setLoading(false);
//         }
//     };

//     return (
//         <VStack spacing='5px'>
//             <FormControl id='first-name' isRequired>
//                 <FormLabel>Name</FormLabel>
//                 <Input
//                     placeholder='Enter Your Name'
//                     onChange={(e) => setName(e.target.value)}
//                 />
//             </FormControl>

//             <FormControl id='email' isRequired>
//                 <FormLabel>Email</FormLabel>
//                 <Input
//                     placeholder='Enter Your Email'
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//             </FormControl>

//             <FormControl id='password' isRequired>
//                 <FormLabel>Password</FormLabel>
//                 <InputGroup>
//                     <Input
//                         type={show ? "text" : "password"}
//                         placeholder='Enter Your Password'
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <InputRightElement width='4.5rem'>
//                         <Button h='1.75rem' size='sm' onClick={handleClick}>
//                             {show ? "Hide" : "Show"}
//                         </Button>
//                     </InputRightElement>
//                 </InputGroup>
//             </FormControl>

//             <FormControl id='password' isRequired>
//                 <FormLabel>Confirm Password</FormLabel>
//                 <InputGroup size='md'>
//                     <Input
//                         type={show ? "text" : "password"}
//                         placeholder='Confirm Password'
//                         onChange={(e) => setConfirmpassword(e.target.value)}
//                     />
//                     <InputRightElement width='4.5rem'>
//                         <Button h='1.75rem' size='sm' onClick={handleClick}>
//                             {show ? "Hide" : "Show"}
//                         </Button>
//                     </InputRightElement>
//                 </InputGroup>
//             </FormControl>

//             <FormControl id='pic'>
//                 <FormLabel>Upload your Picture</FormLabel>
//                 <Input
//                     type='file'
//                     p={1.5}
//                     accept='image/*'
//                     onChange={(e) => postDetails(e.target.files[0])}
//                 />
//             </FormControl>

//             <Button
//                 colorScheme='blue'
//                 width='100%'
//                 style={{ marginTop: 15 }}
//                 onClick={submitHandler}
//                 isLoading={loading}
//             >
//                 Sign Up
//             </Button>
//         </VStack>
//     );
// }

// export default Signup;
