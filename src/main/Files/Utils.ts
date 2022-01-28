/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-template */
import { Nombre } from './interface';

const firstLetterUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getNameAndLastName = (str: string) => {
  const tokens = str.split(' ');
  // Arreglo donde se guardan las palabras del nombre.
  const names: string[] = [];
  // Palabras de apellidos y nombres compuestos
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const special_tokens: string[] = [
    'da',
    'de',
    'del',
    'la',
    'las',
    'los',
    'mac',
    'mc',
    'van',
    'von',
    'y',
    'i',
    'san',
    'santa',
  ];
  let prev = '';
  tokens.forEach((token) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // eslint-disable-next-line no-underscore-dangle
    const _token = token.toLowerCase();
    if (special_tokens.includes(_token)) {
      prev = `${prev}${firstLetterUpperCase(_token)} `;
    } else {
      names.push(`${prev}${firstLetterUpperCase(_token)}`);
      prev = '';
    }
  });

  const num_nombres = names.length;

  let nombres = '';
  let apellidos = '';

  switch (num_nombres) {
    case 0:
      nombres = '';
      break;
    case 1:
      nombres = names[0];
      break;
    case 2:
      nombres = names[0];
      apellidos = names[1];
      break;
    case 3:
      nombres = names[0];
      apellidos = `${names[1]} ${names[2]}`;
      break;
    case 4:
      nombres = `${names[0]} ${names[1]}`;
      apellidos = `${names[2]} ${names[3]}`;
      break;
    default:
      nombres = `${names[0]} ${names[1]}`;
      names.splice(0, 2);
      apellidos = names.join(' ');
      break;
  }

  return {
    Apellido_Paterno: nombres,
    Apellido_Materno: apellidos,
  };
};

const capitalizeName = (name: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  let nombre: string = '';
  if (name) {
    const nameArray = name.trim().split(' ');

    if (nameArray.length > 1) {
      // eslint-disable-next-line no-restricted-syntax
      for (const iterator of nameArray) {
        nombre = `${nombre} ${firstLetterUpperCase(
          iterator.toLowerCase().trim()
        )}`;
      }
    } else {
      nombre = firstLetterUpperCase(nameArray[0].toLowerCase().trim());
    }
  } else {
    nombre = '';
  }
  return nombre.trim();
};

const getNombre = (nombre: string): Nombre | undefined => {
  if (nombre) {
    const nombreArray = nombre.split(',');
    const apellidos = getNameAndLastName(nombreArray[0]);
    return {
      Apellido_Paterno: apellidos.Apellido_Paterno,
      Apellido_Materno: apellidos.Apellido_Materno,
      Nombre: capitalizeName(nombreArray[1]),
    };
    // eslint-disable-next-line no-else-return
  } else {
    return {
      Apellido_Paterno: '',
      Apellido_Materno: '',
      Nombre: '',
    };
  }
};

export const findGEID = (data: any) => {
  return {
    // eslint-disable-next-line no-underscore-dangle
    GEID: data.__EMPTY_4,
    // eslint-disable-next-line no-underscore-dangle
    SOEID: data.__EMPTY_5,
    // eslint-disable-next-line no-underscore-dangle
    ...getNombre(data.__EMPTY_3),
    Empresa: 'Stefanini',
  };
};

export const findSkills = (data: any, dataSap: any[]) => {
  let newData: any[];
  for (const value of dataSap) {
    if (value.GEID !== 'undefined') {
      data.forEach((persona: any) => {
        console.log(persona);
      });
    }
  }
};
