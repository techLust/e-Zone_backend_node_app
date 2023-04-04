exports.getSingleUserData = async (req, res) => {
    try {
        // console.log("IP address",req.socket.remoteAddress)
        const userDetails = req.user;
        if (!userDetails) return res.json({ message: 'Profile details not found' })
        if (userDetails != null) {
            return res.status(200).json({
                message: 'Profile details',
                user: userDetails
            })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

// var ip;
// if (req.headers['x-forwarded-for']) {
//     ip = req.headers['x-forwarded-for'].split(",")[0];
// } else if (req.connection && req.connection.remoteAddress) {
//     ip = req.connection.remoteAddress;
// } else {
//     ip = req.ip;
// }console.log("client IP is *********************" + ip);