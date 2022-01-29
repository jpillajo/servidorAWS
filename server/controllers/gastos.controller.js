const Gasto = require('../models/gastos');
const gastosController = {};

gastosController.getGastos = async(req, res)=>{
    const gastos = await Gasto.find();
    res.json(gastos);
    //res.json({ status: 'gastos...'});
};

gastosController.createGastos = async(req,res)=>{
    const gasto = new Gasto(req.body);
    console.log(gasto);
    await gasto.save();
    res.json('status: Gasto guardado');
}
 
gastosController.getGasto = async(req,res)=>{
    console.log(req.params.id);
    const gasto = await Gasto.findById(req.params.id);
    res.json(gasto);
}

gastosController.editGasto = async(req,res)=>{
    const {id} = req.params;
    const gasto = {
        tipo: req.body.tipo,
        ruc: req.body.ruc,
        empresa: req.body.empresa,
        monto: req.body.monto
    };
    await Gasto.findByIdAndUpdate(id, {$set:gasto},{new: true});
    res.json('status: Gasto actualizado');
}
/*gastosController.editGasto=function(){
    const {id}=req.params;
    const gasto={
        tipo: req.body.tipo,
        ruc: req.body.ruc,
        empresa: req.body.empresa,
        monto: req.body.monto
    };
    Gasto.findByIdAndUpdate(id, {$set:gasto},{new: true});
    res.json('status: Gasto actualizado');
}*/

gastosController.deleteGasto = async(req,res)=>{
    var id = req.params.id
    console.log(id);
    Gasto.findByIdAndDelete(id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
            res.json('status: Gasto eliminado');
        }
    });
}

/*gastosController.deleteGasto=function(){
    Gasto.findByIdAndDelete(id, {$set:gasto},{new: true});
}*/

module.exports = gastosController;