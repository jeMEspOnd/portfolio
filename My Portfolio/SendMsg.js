document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data using jQuery
    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();
    const otp = generateOtp(); // Function to generate a random OTP

    // Initialize Mailgun with your API key and domain
    const mailgun = require('mailgun-js');
    const mg = mailgun({ apiKey: '842e7f85bcf94a49506902faa9ee5455-5dcb5e36-bc4613bf', domain: 'YOUR_DOMAIN' }); // Replace YOUR_DOMAIN

    // Prepare data for sending OTP email
    const data = {
        from: 'your-email@example.com', // Use a verified email in Mailgun
        to: email, // Send OTP to the user's email
        subject: 'Feedback OTP Code',
        text: `Your OTP code is: ${otp}`, // OTP sent to user
    };

    // Send the OTP email
    mg.messages().send(data, function (error, body) {
        if (error) {
            console.error('Error sending email:', error);
            alert('Error sending OTP. Please try again.');
        } else {
            console.log('Email sent successfully:', body);
            document.getElementById('otpSection').style.display = 'block'; // Show OTP input section
        }
    });
});

// Function to generate a random OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
}

document.getElementById('verifyOtp').addEventListener('click', function () {
    const otp = document.getElementById('otp').value; // Get the OTP entered by the user
    const email = $('#email').val(); // Get the email again using jQuery

    // Verify the OTP (you will need to implement the server-side verification)
    fetch('https://api.example.com/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, otp: otp }) // Send email and OTP for verification
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.valid) {
                // OTP is valid, proceed to send the message
                sendMessage(email, name, message);
            } else {
                alert('Invalid OTP. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error verifying OTP:', error);
            alert('Error verifying OTP. Please try again.');
        });
});

// Function to send the final message
function sendMessage(email, name, message) {
    const data = {
        Name: name,
        Email: email,
        content: message
    };

    // Send the message to your API
    fetch('http://172.27.31.211:234/api/Main/Get/PortfolioFeedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Message sent:', data);
            alert('Message sent successfully!'); // You can replace this with a custom success message
            document.getElementById('contactForm').reset(); // Reset the form
            document.getElementById('otpSection').style.display = 'none'; // Hide OTP section
        })
        .catch(error => {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again later.');
        });
}
