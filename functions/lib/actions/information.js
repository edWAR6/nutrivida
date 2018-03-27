"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
const Tools = require("../tools/stringFormat");
const Subjects = require("../collections/subjects");
const response_1 = require("../webhook/response");
const message_1 = require("./../webhook/message");
const text_1 = require("./../webhook/text");
const simpleResponse_1 = require("../webhook/simpleResponse");
const card_1 = require("../webhook/card");
const button_1 = require("../webhook/button");
const basicCard_1 = require("../webhook/basicCard");
const image_1 = require("../webhook/image");
const actionButton_1 = require("../webhook/actionButton");
const openUriAction_1 = require("../webhook/openUriAction");
// if (!admin.apps.length) {
//   admin.initializeApp(functions.config().firebase);
// }
// const products = admin.firestore().collection('products');
// const definitions = admin.firestore().collection('definitions');
// const informations = admin.firestore().collection('informations');
// const subjects = admin.firestore().collection('subjects');
const getInformation = function (parameters) {
    console.log(`Parameters ${JSON.stringify(parameters)}`);
    return new Promise((resolve, reject) => {
        const promises = [];
        parameters.subject.forEach(parameter => {
            promises.push(Subjects.getById(parameter));
        });
        Promise.all(promises).then(subjects => {
            let speech = '';
            let text = '';
            let buttons;
            let actionButtons;
            const messages = [];
            const response = new response_1.Response();
            subjects.forEach(subject => {
                if (!subject.notFound) {
                    speech += `, ${subject.information}`;
                    text += `, ${subject.information}`;
                    buttons = [];
                    actionButtons = [];
                    if (subject.url) {
                        buttons.push(new button_1.Button('Más información', subject.url));
                        actionButtons.push(new actionButton_1.ActionButton('Más información', new openUriAction_1.OpenUriAction(subject.url)));
                    }
                    messages.push(new message_1.Message(message_1.Platform.unspecified, new text_1.Text([
                        Tools.formatList(text),
                        subject.phone ? `Teléfono: ${subject.phone}` : '',
                        subject.email ? `Email: ${subject.email}` : ''
                    ])));
                    messages.push(new message_1.Message(message_1.Platform.google, undefined, new simpleResponse_1.SimpleResponses([new simpleResponse_1.SimpleResponse(Tools.formatList(speech), Tools.formatList(text))])));
                    messages.push(new message_1.Message(message_1.Platform.google, undefined, undefined, undefined, new basicCard_1.BasicCard(`Teléfono: ${subject.phone ? subject.phone : 'No encontrado'}, Email: ${subject.email ? subject.email : 'No encontrado'}`, subject.name, undefined, new image_1.Image(subject.image), actionButtons)));
                    messages.push(new message_1.Message(message_1.Platform.facebook, new text_1.Text([
                        Tools.formatList(text),
                        subject.phone ? `Teléfono: ${subject.phone}` : '',
                        subject.email ? `Email: ${subject.email}` : ''
                    ])));
                    messages.push(new message_1.Message(message_1.Platform.facebook, undefined, undefined, new card_1.Card(subject.name, `Teléfono: ${subject.phone ? subject.phone : 'No encontrado'}, Email: ${subject.email ? subject.email : 'No encontrado'}`, subject.image, buttons)));
                }
            });
            response.fulfillmentText = Tools.formatList(text);
            response.fulfillmentMessages = messages;
            // cards.forEach(card => {
            //   response.fulfillmentMessages.push(new Message(Platform.google, undefined, card));
            //   response.fulfillmentMessages.push(new Message(Platform.facebook, undefined, card));
            // });
            // const response2: Response = new Response(
            //   Tools.formatList(text),
            //   [new Message(
            //     Platform.google,
            //     undefined,
            //     cards
            //   ),
            //   new Message(
            //     Platform.facebook,
            //     new SimpleResponses([new SimpleResponse(
            //       Tools.formatList(speech),
            //       Tools.formatList(text),
            //     )])
            //     // new Card('Title', 'Subtitle', 'http://icons.iconarchive.com/icons/icons8/android/256/Social-Networks-Facebook-icon.png', [
            //     //   new Button('Hola', 'www.google.com'),
            //     // ]),
            //   )]
            // );
            resolve(response);
        });
    });
};
exports.getInformation = getInformation;
//# sourceMappingURL=information.js.map