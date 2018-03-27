// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
import * as Tools from '../tools/stringFormat';
import * as Subjects from '../collections/subjects';
import { Response } from '../webhook/response';
import { Message, Platform } from './../webhook/message';
import { Text } from './../webhook/text';
import { SimpleResponse, SimpleResponses } from '../webhook/simpleResponse';
import { Card } from '../webhook/card';
import { Button } from '../webhook/button';
import { BasicCard } from '../webhook/basicCard';
import { Image } from '../webhook/image';
import { ActionButton } from '../webhook/actionButton';
import { OpenUriAction } from '../webhook/openUriAction';

// if (!admin.apps.length) {
//   admin.initializeApp(functions.config().firebase);
// }

// const products = admin.firestore().collection('products');
// const definitions = admin.firestore().collection('definitions');
// const informations = admin.firestore().collection('informations');
// const subjects = admin.firestore().collection('subjects');

const getInformation = function(parameters) {
  console.log(`Parameters ${JSON.stringify(parameters)}`);
  return new Promise((resolve, reject) => {
    const promises: Array<Promise<any>> = [];
    parameters.subject.forEach(parameter => {
      promises.push(Subjects.getById(parameter));
    });
    Promise.all(promises).then(subjects => {
      let speech = '';
      let text = '';
      let buttons: Array<Button>;
      let actionButtons: Array<ActionButton>;
      const messages: Array<Message> = [];
      const response: Response = new Response();
      subjects.forEach(subject => {
        if (!subject.notFound) {
          speech += `, ${subject.information}`;
          text += `, ${subject.information}`;
          buttons = [];
          actionButtons = [];
          if (subject.url) {
            buttons.push(new Button('Más información', subject.url))
            actionButtons.push(new ActionButton('Más información', new OpenUriAction(subject.url)));
          }
          messages.push(new Message(Platform.unspecified, new Text(
            [
              Tools.formatList(text),
              subject.phone? `Teléfono: ${subject.phone}` : '',
              subject.email? `Email: ${subject.email}` : ''
            ],
          )));
          messages.push(new Message(Platform.google, undefined, new SimpleResponses([new SimpleResponse(
            Tools.formatList(speech),
            Tools.formatList(text),
          )])));
          messages.push(new Message(Platform.google, undefined, undefined, undefined, new BasicCard(
            `Teléfono: ${subject.phone? subject.phone : 'No encontrado'}, Email: ${subject.email? subject.email : 'No encontrado'}`,
            subject.name,
            undefined,
            new Image(subject.image),
            actionButtons
          )));
          messages.push(new Message(Platform.facebook, new Text(
            [
              Tools.formatList(text),
              subject.phone? `Teléfono: ${subject.phone}` : '',
              subject.email? `Email: ${subject.email}` : ''
            ],
          )));
          messages.push(new Message(Platform.facebook, undefined, undefined, new Card(
            subject.name,
            `Teléfono: ${subject.phone? subject.phone : 'No encontrado'}, Email: ${subject.email? subject.email : 'No encontrado'}`,
            subject.image,
            buttons
          )));
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
}

// const getInformation = function(parameters) {
//   console.log(parameters);
//   if (typeof parameters.subject === 'string' && parameters.subject.length > 0) {
//     return getInformationBySubject(parameters.subject);
//   } else if (parameters.subject instanceof Array && parameters.subject > 0 && parameters.subject.contains('Beneficios')) {
//     return getInformationBySubject('Beneficios');
//   } else if (parameters.subject === 'MANU' || parameters.subject === 'Nutrivida') {
//     return about(parameters.subject);
//   } else {
//     return null;
//   }
// }

// function getInformationBySubject(subject: string) {
//   return new Promise((resolve, reject) => {
//     informations.doc(subject).get().then(document => {
//       if (!document.exists) {
//         resolve({
//           fulfillmentMessages: [{
//             'platform': 'ACTIONS_ON_GOOGLE',
//             'simple_responses': {
//               'simple_responses': [
//                 {
//                   'text_to_speech': `Disculpe, pero aun no se esta definición, pero el gran equipo de trabajo detrás de este Bot se encargará de enseñarme.`,
//                   'display_text': `No se esa definición 🙄`
//                 }
//               ]
//             }
//           }],
//           fulfillmentText: `Disculpe, aun no se esa definición 🙄`
//         });
//       } else {
//         resolve({
//           fulfillmentMessages: [{
//             'platform': 'ACTIONS_ON_GOOGLE',
//             'simple_responses': {
//               'simple_responses': [
//                 {
//                   'text_to_speech': `${document.data().speech}`,
//                   'display_text': `${document.data().text}`
//                 }
//               ]
//             }
//           }, {
//             'platform': 'ACTIONS_ON_GOOGLE',
//             'basic_card': {
//               'title': subject,
//               'formatted_text': `${document.data().text}`,
//               'image': {
//                 'image_uri': `${document.data().image}`
//               },
//               'buttons': [
//                 {
//                   'title': 'Más información',
//                   'open_uri_action': {
//                     'uri': `${document.data().url}`
//                   }
//                 }
//               ]
//             }
//           },{
//             'platform': 'FACEBOOK',
//             'card': {
//               'title': subject,
//               'subtitle': `${document.data().text}`,
//               'imageUri': `${document.data().image}`,
//               'buttons': [
//                 {
//                   'text': 'Más información',
//                   'postback': `${document.data().url}`
//                 }
//               ]
//             }
//           }],
//           fulfillmentText: `${document.data().text}` 
//         });
//       }
//     });
//   });
// }

// function getBenefits(name) {
//   return new Promise((resolve, reject) => {
//     networkDialogs.get().then(snapshot => {
//       snapshot.forEach(document => {
//         informations.doc(document.id).set(
//           {...document.data()}
//         );
//       });
//     });
//   });
// }

// function about(subject) {
//   return new Promise((resolve, reject) => {
//     definitions.doc(subject).get().then(document => {
//       if (!document.exists) {
//         resolve({
//           fulfillmentMessages: [{
//             'platform': 'ACTIONS_ON_GOOGLE',
//             'simple_responses': {
//               'simple_responses': [
//                 {
//                   'text_to_speech': `Disculpe, pero aun no se esta definición, pero el gran equipo de trabajo detrás de este Bot se encargará de enseñarme.`,
//                   'display_text': `No se esa definición 🙄`
//                 }
//               ]
//             }
//           }],
//           fulfillmentText: `Disculpe, aun no se esa definición 🙄`
//         });
//       } else {
//         resolve({
//           fulfillmentMessages: [{
//             'platform': 'ACTIONS_ON_GOOGLE',
//             'simple_responses': {
//               'simple_responses': [
//                 {
//                   'text_to_speech': `${document.data().description}`,
//                   'display_text': `${document.data().name}`
//                 }
//               ]
//             }
//           },
//           {
//             'platform': 'ACTIONS_ON_GOOGLE',
//             'basic_card': {
//               'title': `${document.data().name}`,
//               'subtitle': `${document.data().shortDescription}`,
//               'formatted_text': `${document.data().description}`,
//               'image': {
//                 'image_uri': `${document.data().image}`
//               },
//               'buttons': [
//                 {
//                   'title': '¿Qué hacemos?',
//                   'open_uri_action': {
//                     'uri': `${document.data().url}`
//                   }
//                 }
//               ]
//             }
//           }],
//           fulfillmentText: `${document.data().description}` 
//         });
//       }
//     }).catch(error => {
//       console.log('Error getting document', error);
//       reject(error);
//     });
//   });
// }

export {getInformation}
