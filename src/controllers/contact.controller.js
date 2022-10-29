exports.create = (req, res) => {
    return res.send({message: 'create hendler'});
};

exports.findAll = (req, res) => {
    return res.send({message: 'findAll handler'});
};

exports.findOne = (req, res) => {
    return res.send({message: 'findOne handler'});
};

exports.update = (req, res) => {
    return res.send({message: 'update handler'});
};

exports.delete = (req, res) => {
    return res.send({message: 'delete handler'});
};

exports.deleteAll = (req, res) => {
    return res.send({message: 'deleteAll handler'});
};

exports.findAllFavorite = (req, res) => {
    return res.send({message: 'findAllFavorite handler'});
};


// const ContactService = require('../services/contact.service');
// const ApiError = require('../api-error');

// exports.create = async (req, res, next) => {
//     if (!req.body?.name){
//         return next(new ApiError(400, 'Name can not be empty'));

//     }
//     try {
//         const contactService = new ContactService();
//         const contact = await contactService.create(req.body);
//         return res.send(contact);
//     }
//     catch (error) {
//         console.log(error);
//         return next(
//             new ApiError(500, 'An error occured while creating the contact')
//         );
//     }
// }


exports.findAll = async (req, res, next) => {
    let contact = [];

    try {
        const contactService = new ContactService();
        const { name } = req.query;
        if (name) {
            contact = await contactService.findByName(name);
        } else {
            contact = await contactService.all();
        }
    }
    catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occursed while retrieving contacts')
        );
    }

    return res.send(contacts);
};


exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService();
        const contact = await contactService.findById(req.params.id);
        if (!contact) { 
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.send(contact);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};


