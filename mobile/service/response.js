const successResponse = (data) => ({

    data: data,
    error: null,
    success: true
})
const errorResponse = (data) => ({
    error: data,
    message: "unsuccess",
    success: false

})

module.exports =
{
    successResponse,
    errorResponse
}