//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:

//IMPORTS DE LA APP:
const Menu = require('../models/Menu');

const createMenu = async( req, res ) => {
    const menu = new Menu(req.body);
    menu.save(( error, menuStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo menu' });
        }else {
            res.status(201).send({
                msg: 'Menu creado correctamente',
                menuStorage
            })
        }
    })
};

const getMenus = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los Menus de forma ordenada:
        response = await Menu.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los Menuss activos:
        response = await Menu.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener menus' });
    } else{
        res.status(200).send(response);
    }
    
}

const updateMenu = async( req, res ) => {
    const {id} = req.params;
    const menuData = req.body;

    Menu.findByIdAndUpdate( {_id:id }, menuData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el menu' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del menu con exito' });
        }
    });
}

const deleteMenu = async( req, res ) => {
    const { id } = req.params;
    Menu.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el menu' });
        }else {
            res.status(200).send({ msg: 'Menu borrado con exito' });
        }
        
    });

}

module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
};