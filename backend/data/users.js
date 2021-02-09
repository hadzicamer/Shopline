import bcrypt from 'bcryptjs'

const users=[
    {
        name:'Admin',
        email:'admin@mail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Basic',
        email:'basic@mail.com',
        password:bcrypt.hashSync('123456',10),
    },
    {
        name:'Third',
        email:'third@mail.com',
        password:bcrypt.hashSync('123456',10),
    },
]

export default users