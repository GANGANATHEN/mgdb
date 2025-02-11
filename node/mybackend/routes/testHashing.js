// import bcrypt from 'bcrypt';

// const password = '123'; // The original password
// const storedHashedPassword = '$2b$10$jxvQ5d0qEbYTMu/t.StMh.arvfD7jIUZgO9Q/adLVRMyHTmq3Ln2i'; // Example hashed password

// const checkPassword = async () => {
//     // Hash the password again for comparison
//     const newHashedPassword = await bcrypt.hash(password, 10);

//     // Compare both hashes
//     const match = await bcrypt.compare(password, storedHashedPassword);
//     console.log('Stored Hashed Password:', storedHashedPassword);
//     console.log('Newly Hashed Password:', newHashedPassword);
//     console.log('Password Match Result:', match);
// };

// checkPassword().catch(console.error);


import bcrypt from 'bcrypt';

const password = 'g'; // The plaintext password provided by the user
const storedHashedPassword = '$2b$10$1chmZ.LZBaoxUceYUrDN0.21j7KBO7wcZlj6kUpnaYuN4Rug6Bebq'; // Hashed password from the database

const checkPassword = async () => {
    // Use bcrypt.compare to verify the password
    const match = await bcrypt.compare(password, storedHashedPassword);
    console.log('Password Match Result:', match); // Should log true if the password matches
};

checkPassword().catch(console.error);
