import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp(functions.config().firebase);
}

const products = admin.firestore().collection('products');
const definitions = admin.firestore().collection('definitions');
const informations = admin.firestore().collection('informations');

const getInformation = function(parameters) {
  console.log(parameters);
  if (typeof parameters.subject === 'string' && parameters.subject.length > 0) {
    return getInformationBySubject(parameters.subject);
  } else if (parameters.subject instanceof Array && parameters.subject > 0 && parameters.subject.contains('Beneficios')) {
    return getInformationBySubject('Beneficios');
  } else if (parameters.subject === 'MANU' || parameters.subject === 'Nutrivida') {
    return about(parameters.subject);
  } else {
    return null;
  }
}

function getInformationBySubject(subject: string) {
  return new Promise((resolve, reject) => {
    informations.doc(subject).get().then(document => {
      if (!document.exists) {
        resolve({
          fulfillmentMessages: [{
            'platform': 'ACTIONS_ON_GOOGLE',
            'simple_responses': {
              'simple_responses': [
                {
                  'text_to_speech': `Disculpe, pero aun no se esta definición, pero el gran equipo de trabajo detrás de este Bot se encargará de enseñarme.`,
                  'display_text': `No se esa definición 🙄`
                }
              ]
            }
          }],
          fulfillmentText: `Disculpe, aun no se esa definición 🙄`
        });
      } else {
        resolve({
          fulfillmentMessages: [{
            'platform': 'ACTIONS_ON_GOOGLE',
            'simple_responses': {
              'simple_responses': [
                {
                  'text_to_speech': `${document.data().speech}`,
                  'display_text': `${document.data().text}`
                }
              ]
            }
          }, {
            'platform': 'ACTIONS_ON_GOOGLE',
            'basic_card': {
              'title': subject,
              'formatted_text': `${document.data().text}`,
              'image': {
                'image_uri': `${document.data().image}`
              },
              'buttons': [
                {
                  'title': 'Más información',
                  'open_uri_action': {
                    'uri': `${document.data().url}`
                  }
                }
              ]
            }
          },{
            'platform': 'FACEBOOK',
            'card': {
              'title': subject,
              'subtitle': `${document.data().text}`,
              'imageUri': `${document.data().image}`,
              'buttons': [
                {
                  'text': 'Más información',
                  'postback': `${document.data().url}`
                }
              ]
            }
          }],
          fulfillmentText: `${document.data().text}` 
        });
      }
    });
  });
}

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

function about(subject) {
  return new Promise((resolve, reject) => {
    definitions.doc(subject).get().then(document => {
      if (!document.exists) {
        resolve({
          fulfillmentMessages: [{
            'platform': 'ACTIONS_ON_GOOGLE',
            'simple_responses': {
              'simple_responses': [
                {
                  'text_to_speech': `Disculpe, pero aun no se esta definición, pero el gran equipo de trabajo detrás de este Bot se encargará de enseñarme.`,
                  'display_text': `No se esa definición 🙄`
                }
              ]
            }
          }],
          fulfillmentText: `Disculpe, aun no se esa definición 🙄`
        });
      } else {
        resolve({
          fulfillmentMessages: [{
            'platform': 'ACTIONS_ON_GOOGLE',
            'simple_responses': {
              'simple_responses': [
                {
                  'text_to_speech': `${document.data().description}`,
                  'display_text': `${document.data().name}`
                }
              ]
            }
          },
          {
            'platform': 'ACTIONS_ON_GOOGLE',
            'basic_card': {
              'title': `${document.data().name}`,
              'subtitle': `${document.data().shortDescription}`,
              'formatted_text': `${document.data().description}`,
              'image': {
                'image_uri': `${document.data().image}`
              },
              'buttons': [
                {
                  'title': '¿Qué hacemos?',
                  'open_uri_action': {
                    'uri': `${document.data().url}`
                  }
                }
              ]
            }
          }],
          fulfillmentText: `${document.data().description}` 
        });
      }
    }).catch(error => {
      console.log('Error getting document', error);
      reject(error);
    });
  });
}

export {getInformation}
