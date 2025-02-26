import { muscleGroupApi } from "../api/msCategories/muscle-group.api";
import { trainingStyleApi } from "../api/msCategories/training-styles-api";
import { exerciseType } from "../types/exercise.type";

const imageUrlDefault = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdzRtTjqaXvOLvoiBWULqxnA-fc15Ros3dzw&s';

export const exerciseSeeds = async (token: string) => {
    // Exercises seed 
    const listExercises: exerciseType[] = [];

    // Get all muscle group example: (pecho, biceps)
    // const allMuscleGroups = await muscleGroupApi.getAllMusclegroups(token);
    // const allTrainingStyle = await trainingStyleApi.getallTrainingStyles(token);

    const [allMuscleGroups, allTrainingStyle] = await  Promise.all([
        muscleGroupApi.getAllMusclegroups(token),
        trainingStyleApi.getallTrainingStyles(token)
    ]);
 
    // Get id muscleGroup
    const pechoMuscleGroupIdVal = allMuscleGroups.find(group => group.name === 'pecho')?.id;
    const tricepsMuscleGroupIdVal = allMuscleGroups.find(group => group.name === 'tríceps')?.id;
    const bicepsMuscleGroupIdVal = allMuscleGroups.find(group => group.name === 'biceps')?.id;
    const backMuscleGroupIdVal = allMuscleGroups.find(group => group.name === 'espalda')?.id;
    const legMuscleGroupIdVal = allMuscleGroups.find(group => group.name === 'pierna')?.id;
    const deltoideMuscleGroupIdVal = allMuscleGroups.find(group => group.name === 'deltoide')?.id;

    // get id trainingStyleId
    const cardioIdVal = allTrainingStyle.find( item => item.name = 'cardio' )?.id;
    const hypertrophyTrainingStyleIdVal = allTrainingStyle.find( item => item.name = 'Hypertrophy Training')?.id;

    // Generate Exercises Seeds
    if (pechoMuscleGroupIdVal && hypertrophyTrainingStyleIdVal) {
        const data = [
            {
                name: 'Press de pecho en máquina',
                muscleGroupId: pechoMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El press de pecho en máquina es un ejercicio de entrenamiento de fuerza que se enfoca en los músculos del pecho, los hombros y los tríceps. Es una excelente manera de desarrollar y fortalecer los músculos de la parte superior del cuerpo, lo que puede mejorar tu postura, aumentar la fuerza y mejorar la apariencia física. Incorporar este ejercicio en tu rutina de entrenamiento puede ser muy beneficioso para lograr tus objetivos de fitness.'
            },
            {
                name: 'Press de banca inclinado con mancuernas',
                muscleGroupId: pechoMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El press de banca inclinado con mancuernas es considerado como uno de los ejercicios que más se practican en los gimnasios en la actualidad. Cuando se lleva a cabo entrenamiento de musculación, entonces se trata de un ejercicio esencial en el entrenamiento de la zona del pecho, que incuso es practicado por atletas de alto rendimiento.'
            },
            {
                name: 'Press de banca con barra',
                muscleGroupId: pechoMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: '¿Quieres fortalecer tus músculos pectorales, tríceps y hombros? El press de banca con barra es uno de los ejercicios más populares en el entrenamiento de fuerza, y es muy efectivo para desarrollar la fuerza y la masa muscular en la parte superior del cuerpo. Además, es un ejercicio básico que se puede realizar con un equipamiento mínimo en cualquier gimnasio.'
            },
            {
                name: 'Aperturas pec deck de pecho',
                muscleGroupId: pechoMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'Las aperturas pec deck de pecho, también conocidas como de contractor, son consideradas como uno de los ejercicios que más trabaja los músculos localizados en la región del pecho. Se trata de un ejercicio ideal para principiantes; y esto se debe, sobre todo, a que gracias a este ejercicio se adquiere fuerza con el fin de que, posteriormente, pasemos a ejercicios considerados como más complicados.'
            },
            {
                name: 'Aperturas con mancuernas en banco inclinado',
                muscleGroupId: pechoMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El ejercicio de apertura con mancuernas en banco inclinado es un ejercicio relativamente fácil de realizar, que no necesita demasiada preparación. Con él se trabajan los músculos de la parte superior, esencialmente los pectorales.'
            },
            {
                name: 'Vuelos a una mano con mancuerna',
                muscleGroupId: pechoMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'Los vuelos a una mano con mancuerna son un ejercicio popular en el mundo del fitness que se enfoca en fortalecer los músculos de la espalda, los hombros y los brazos.'
            },
            
        ] as exerciseType[];

        listExercises.push(...data)
    }

    if(tricepsMuscleGroupIdVal && hypertrophyTrainingStyleIdVal){
        const data = [
            {
                name: 'Press de copa con mancuerna de pie',
                muscleGroupId: tricepsMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El press de copa con mancuerna de pie es un ejercicio de aislamiento que fortalece y tonifica los músculos de los tríceps. Es un ejercicio efectivo para lograr brazos más fuertes y definidos. Este ejercicio es ideal para aquellos que desean mejorar su rendimiento en deportes que requieren una gran fuerza en los brazos, como el levantamiento de pesas o la gimnasia.'
            },
            {
                name: 'Press francés en banco plano',
                muscleGroupId: tricepsMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El press francés o rompecráneos es un ejercicio completamente de aislamiento que ha sido utilizado de muchas formas en el mundo deportivo, a través de diferentes tipos de levantamiento de pesas. De hecho, es uno de los ejercicios que genera mayor estimulación a nivel del grupo muscular del tríceps.'
            },
            {
                name: 'Patada de tríceps con mancuerna',
                muscleGroupId: tricepsMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: '¿Estás buscando un ejercicio efectivo para fortalecer tus tríceps? La patada de tríceps con mancuerna puede ser justo lo que necesitas. Este ejercicio es simple pero muy efectivo y puede ayudarte a tonificar y fortalecer tus brazos en poco tiempo. '
            },
            {
                name: 'Extensión de tríceps en polea',
                muscleGroupId: tricepsMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'Si estás buscando una forma efectiva de trabajar tus tríceps, el ejercicio de extensión de tríceps con agarre en V en polea es una excelente opción. Este ejercicio se enfoca en la cabeza larga del tríceps, ayudándote a desarrollar brazos más fuertes y definidos. Además, al usar la polea, puedes controlar mejor el peso y el movimiento para evitar lesiones.'
            },
            {
                name: 'Fondos en banco plano',
                muscleGroupId: tricepsMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'Los fondos en banco plano ayudan a fortalecer los músculos de los tríceps; pues básicamente es con estos que realizamos la elevación del cuerpo. Los músculos que se trabajan en este ejercicio son los tríceps, en menor medida los bíceps y la región de los hombros e, incluso, los cuadríceps y glúteos en menor medida (que sostendrán la parte inferior del cuerpo).'
            },
        ] as exerciseType[];

        listExercises.push(...data)
    }

    if (bicepsMuscleGroupIdVal && hypertrophyTrainingStyleIdVal) {
        const data = [
            {
                name: 'Curl predicador a una mano con mancuerna',
                muscleGroupId: bicepsMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El curl predicador a una mano con mancuerna es un excelente ejercicio unilateral para fortalecer los bíceps y mejorar el aislamiento muscular en el área del codo. Además, al trabajar un brazo a la vez, puedes corregir desequilibrios musculares y obtener un mejor control y estabilidad en los movimientos. ¡Agrega este ejercicio a tu rutina de entrenamiento de brazos y experimenta el aumento de la fuerza y el tamaño en tus bíceps!'
            },
            {
                name: 'Curl agarre prono con mancuernas',
                muscleGroupId: bicepsMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El curl agarre prono con mancuernas es un ejercicio altamente efectivo para fortalecer y tonificar los antebrazos, en especial el músculo braquiorradial, lo que lo hace ideal para aquellos que buscan mejorar su fuerza y apariencia física. A través de movimientos controlados, puedes trabajar tus músculos de manera efectiva y lograr resultados satisfactorios. '
            },
            {
                name: 'Curl bíceps inclinado con mancuerna',
                muscleGroupId: bicepsMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El curl de bíceps inlcinado es un ejercicio perfecto para potencia la musculatura principalmente los bíceps hasta el antebrazo. Se trata de un ejercicio que implica un movimiento muy sencillo de hacer y que es ampliamente conocido en el mundo de fisicoculturismo.'
            },
            {
                name: 'Curl de bíceps',
                muscleGroupId: bicepsMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El curl de bíceps es uno de esos ejercicios que no debe ni puede faltar en tu rutina de ejercicios si lo que buscas y deseas es obtener un aumento de bíceps considerable. Hoy aprenderás la técnica correcta y los músculos que se fortalecen según el agarre o el peso que estés utilizando (barra o mancuerna).'
            },
            {
                name: 'Curl concentrado con mancuerna (agarre supino)',
                muscleGroupId: bicepsMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El curl concentrado es un ejercicio muy frecuente en la iniciación al mundo fitness, estando presente en la mayoría de las rutinas de musculación que solicitan en frecuente trabajo de los brazos, específicamente en los bíceps.'
            },
            {
                name: 'Curl con barra',
                muscleGroupId: bicepsMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El curl con barra Z agarre supino es un ejercicio altamente efectivo para trabajar los músculos de los brazos, especialmente los bíceps. Este movimiento es ideal para aquellos que buscan aumentar la fuerza y el tamaño de sus brazos.'
            },
        ] as exerciseType[];

        listExercises.push(...data)
    }

    if(backMuscleGroupIdVal && hypertrophyTrainingStyleIdVal){
        const data = [
            {
                name: 'peso muerto rumano',
                muscleGroupId: backMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'Además de ser uno de los mejores ejercicios para isquiotibiales, el peso muerto rumano (RDL) es una de las variantes de peso muerto más populares en los gimnasios de todo el mundo, entre otras cosas porque es ideal para trabajar la cadena muscular posterior del cuerpo, en especial los isquiotibiales y los glúteos.'
            },
            {
                name: 'machine 45 Degree Back Extension',
                muscleGroupId: backMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El Machine 45 Degree Back Extension es un ejercicio que se realiza en una máquina inclinada a 45 grados, diseñado para fortalecer los músculos de la parte baja de la espalda, glúteos y isquiotibiales. Consiste en inclinar el torso hacia adelante desde las caderas y luego extenderlo hacia arriba hasta alinear la espalda con las piernas, manteniendo una postura controlada.'
            },
            {
                name: 'supermans',
                muscleGroupId: backMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'Consiste en acostarse boca abajo con los brazos extendidos hacia adelante y las piernas rectas. Desde esta posición, se levantan simultáneamente los brazos, el pecho y las piernas del suelo, manteniendo la contracción en la parte baja de la espalda durante unos segundos antes de regresar a la posición inicial. Es ideal para fortalecer la zona lumbar, glúteos y músculos estabilizadores.'
            },
            {
                name: 'Remo sentado en polea con agarre de cuerda',
                muscleGroupId: backMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El remo sentado en polea con agarre en cuerda es un ejercicio de entrenamiento de fuerza efectivo para la espalda, los hombros y los brazos. Este movimiento te permite trabajar los músculos de la espalda y los hombros de manera segura y efectiva al utilizar la resistencia controlada de una máquina de polea. '
            },
            {
                name: 'Remo con mancuernas (agarre prono)',
                muscleGroupId: backMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'Es un excelente ejercicio para fortalecer la espalda y los brazos. Este ejercicio es perfecto para aquellos que buscan aumentar la masa muscular en la parte superior del cuerpo y mejorar su postura. '
            },
            {
                name: 'Remo con barra',
                muscleGroupId: backMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El remo con barra Z (agarre supino) es un ejercicio de entrenamiento de fuerza altamente efectivo para desarrollar y fortalecer la espalda, los hombros y los brazos. Además, este ejercicio también puede mejorar tu postura, aumentar la fuerza y mejorar la apariencia física.'
            },
            {
                name: 'Jalón al pecho agarre abierto',
                muscleGroupId: backMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'No tire de la barra hacia abajo tras su cuello, puesto que hacerlo lo forzará a plegar su cuello fuera de alineación con su columna vertebral, como a poner la articulación del hombro en un rango de movimiento extremo, lo que aumenta el peligro de lesiones.'
            },
            {
                name: 'Remo en barra T',
                muscleGroupId: backMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'Tener una rutina de ejercicio te permite conocer los músculos que vas a trabajar en un día. El remo en barra T es uno de los ejercicios más complejos que existen. Por lo que es recomendable solo para aquellas personas que ya tengan un entrenamiento previo.'
            },
            {
                name: 'Jalón al pecho en polea (agarre semi-abierto)',
                muscleGroupId: backMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'Durante la polea al pecho, se fortalece en gran medida las diferentes partes de la musculatura correspondientes a la espalda, especialmente la zona dorsal.  También se incluye la musculatura que conforma la escápula y el hombro.'
            },
            {
                name: 'Pull over ',
                muscleGroupId: backMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El pull over es un ejercicio realizado con mucha frecuencia en gimnasios. Como todos los ejercicios que realicemos, se debe conocer la técnica para realizarlo correctamente.'
            },
        ] as exerciseType[];

        listExercises.push(...data)
    }

    if(legMuscleGroupIdVal && hypertrophyTrainingStyleIdVal){
        const data = [
            {
                name: 'sentadilla con barra',
                muscleGroupId: legMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'La sentadilla con barra es un trabajo excepcional para trabajar músculos como los extensores (glúteos y cuádriceps) pero que requiere de una técnica correcta y control de postura al hacerlo, por lo cual especialmente si eres principiante se recomienda hacerlo con un profesional que te guíe y corrija si es necesario.'
            },
            {
                name: 'Curl a una pierna ',
                muscleGroupId: legMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El curl femoral tumbado, también conocido como curl de piernas o curl de isquiotibiales, es uno de los mejores ejercicios de aislamiento para los isquiotibiales. De hecho, si quieres aumentar la fuerza y el volumen de tus isquiotibiales, no debería faltar en tu rutina de ejercicios de cadena posterior '
            },
            {
                name: 'sentadilla bulgara',
                muscleGroupId: legMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'La sentadilla búlgara es un ejercicio de pierna que trabaja principalmente el cuádriceps y los glúteos, promoviendo el fortalecimiento y la hipertrofia de estos músculos.'
            },
            {
                name: 'extensiones de piernas',
                muscleGroupId: legMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'Las extensiones de piernas son un ejercicio que fortalece los cuádriceps y las rodillas, y que ayuda a definir, estabilizar y aumentar el volumen de las piernas.'
            },
            {
                name: 'peso muerto',
                muscleGroupId: legMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El peso muerto es un ejercicio de extensión de rodilla, cadera y espalda a la vez, pero es frecuente observar la extensión de rodillas y después la espalda o al revés. Esto no es correcto pues tiene que ser un movimiento simultáneo y sincronizado. Mantenerse demasiado tiempo en posición de partida.'
            },
        ] as exerciseType[];

        listExercises.push(...data)
    }

    if(deltoideMuscleGroupIdVal && hypertrophyTrainingStyleIdVal){
        const data = [
            {
                name: 'Press militar',
                muscleGroupId: deltoideMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El press de hombros, también conocido como press de hombros, press estricto o press militar, es un ejercicio de entrenamiento con pesas para la parte superior del cuerpo'
            },
            {
                name: 'Elevaciones laterales con mancuernas',
                muscleGroupId: deltoideMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'Las elevaciones laterales de brazos con mancuernas es uno de los ejercicios más frecuentes en todos y cada uno de los gimnasios para trabajar el deltoides lateral. Asimismo, se ven implicados el trapecio y el deltoides anterior, esto es, la parte delantera de los dos músculos.'
            },
            {
                name: 'Elevación frontal con mancuernas',
                muscleGroupId: deltoideMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'La elevación frontal con mancuernas es un ejercicio ideal para trabajar la parte de los trapecios, a la vez que fortalecemos diversos grupos musculares de los brazos, como la región de los hombros; incluso, podrás moldear la región del pectoral mayor superior. '
            },
            {
                name: 'Press cubano con mancuernas',
                muscleGroupId: deltoideMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'Sin duda el press cubano es un increíble ejercicio para implementar en nuestra rutina si deseamos trabajar los hombros; pese a ello, no es uno de los más conocidos, aún cuando potencia la musculatura de los hombros de una forma realmente efectiva.'
            },
            {
                name: 'Vuelos posteriores',
                muscleGroupId: deltoideMuscleGroupIdVal,
                trainingStyleId: hypertrophyTrainingStyleIdVal,
                imageUrl: imageUrlDefault,
                details: 'El vuelo posterior es un ejercicio que puedes hacer con pesas para trabajar los músculos de la parte superior de la espalda. Durante un vuelo posterior, trabajas los músculos romboides en la parte superior de la espalda y la zona de los hombros.'
            },
        ] as exerciseType[];

        listExercises.push(...data)
    }


    return listExercises;
}