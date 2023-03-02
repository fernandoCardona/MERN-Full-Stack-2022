//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:

//IMPORTS DE LA APP:
const Course = require('../models/Course');
const image = require('../utils/image');

const createCourse = async( req, res ) => {
    const course = new Course(req.body);

    //Condicional de si llega imagen de miniature:
    if ( req.files.miniature ) {
        const imagePath = image.getFilePath(req.files.miniature);
        course.miniature = imagePath;
    }
    //console.log(course)
    
    //Guardamos usuario nuevo en la base de datos:
    course.save(( error, courseStorage ) => {
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo curso' });
            //console.log(error);
        }else {
            res.status(201).send({
                msg: 'Curso creado correctamente',
                courseStorage
            })
        }
    });
};

const getCourses = async( req, res ) => {
    const {page=1,limit=10} = req.query;
    const options = {
        page: parseInt( page ),
        linit: parseInt( limit )
    };

    await Course.paginate({}, options, (error, courses) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al obtener los cursos' });
        } else{
            res.status(200).send(courses);
        }
    });

    
}

const updateCourse = async( req, res ) => {
    const { id } = req.params;
    const courseData = req.body;

    //Condicional de si llega imagen de miniature:
    if (req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        courseData.miniature = imagePath;
      }

    Course.findByIdAndUpdate( {_id: id }, courseData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el Curso' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del Curso con exito' });
        }
    });
}

const deleteCourse = async( req, res ) => {
    const { id } = req.params;
    Course.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el Curso' });
        }else {
            res.status(200).send({ msg: 'Curso borrado con exito' });
        }
        
    });

}

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
};