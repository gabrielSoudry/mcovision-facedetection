import PageOverlay from "../components/PageOverlay";
import "./login.css";
import accueil from "../assets/mcovision2.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { useState, ReactNode } from 'react';

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

export default function LogIn() {
    const [errorMessage, setErrorMessage] = useState(false)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });
        const dataResponse = await postData('http://localhost:3000/auth/login', {
            username: data.get('username'),
            password: data.get('password'),
        })
        window.localStorage.setItem('accessToken', dataResponse.access_token);
        if (dataResponse.statusCode === 401) {
            console.log(dataResponse);
            setErrorMessage(true)
        }
        if (dataResponse.access_token) {
            window.location.href = '/dashboard'; //relative to domain
        }
    };
    return (
        <PageOverlay
            image={accueil}
            title={"Welcome to MCovision camera face detection 🎥"}
            desc={"Login"}
        >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    error={errorMessage}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    error={errorMessage}

                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                {errorMessage && <div style={{ color: 'red', paddingTop: '-30px', marginTop: '-10px' }}>Wrong username or password</div>}
            </Box>
        </PageOverlay >
    );
}
