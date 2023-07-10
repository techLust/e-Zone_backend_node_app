exports.logOut = (req, res) => {
    return res
    .clearCookie("accessToken")
    .status(200)
    .json({status: "Logout successful"})
}