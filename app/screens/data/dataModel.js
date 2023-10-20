const CreateMessage = (postid, message, type) => {
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

// const adsInteractions = [
//     {
//         interactionId:[{messages: [{message: 'hello',senderId: 'senderId'}]}]
//     }
// ]
// const chatInteraction = [
//     {chatInteractionId: chatInteractionId,adId:adId}
// ]

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

export {CreateMessage,createAd,createUser};

