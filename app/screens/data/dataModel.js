const message = (postid, message, type) => {
    return {
        postid: postid,
        messages: [
            {
                message: message,
                type: type
            }
        ]
    };
};

const createAd = ({ownerId, title, price, description, location, category}) => {
    return {
        ownerId: ownerId,
        title: title,
        price: price,
        description: description,
        location: location,
        category: category
    };
};
const createUser = ({ name, phone, email}) => {
    return {
        name: name,
        phone: phone,
        email: email,
        favorites: [],
        messageHistory: [],
        myAds: []
    };
};

export {message,createAd,createUser};

