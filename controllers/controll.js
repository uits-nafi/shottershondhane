const memberschema=require("../models/adminschema")
const blogmodel=require("../models/blogmodel")
const gallerymodel=require("../models/galleymodel")
const fs=require("fs")
const adexpensesmodel=require("../models/adexpenses")
const addusermodel=require("../models/adduser")
// admin income model
const adincomemodel=require("../models/adincome")
const adminschema = require("../models/adminschema")
const home=(req,res)=>{
    try{
       res.render("home")
    }catch(err){
        console.log(err)
    }
}
const login=(req,res)=>{
    try{
       res.render("login")
    }catch(err){
        console.log(err)
    }
}
const loginpost=async(req,res)=>{
    try{
       const {email,mobile,memberid}=req.body;
       const memberdata=await memberschema.findOne({email:email,mobile:mobile,memberid:memberid});
       if(memberdata){
                if(memberdata.is_admin == 1){
                    req.session.user_id=memberdata._id;
                    res.redirect("/admindashboard")
                }else if(memberdata.is_admin == 2){
                    req.session.acuser_id=memberdata._id;
                    console.log(req.session.acuser_id)
                   res.redirect("/accountinfo")
                }else{
                    req.session.memuser_id=memberdata._id;
                   res.redirect("/members")
                }
       }else{
        res.render("login",{message:"Your Information Did Not Match !"})
       }
    }catch(err){
        console.log(err)
    }
}
// admin controller
const admin= (req,res)=>{
    try{
       res.render("admin")
    }catch(err){
        console.log(err)
    }
}
// admin blog route
const amblog=async(req,res)=>{
    try{
        const blogdata=await blogmodel.find();
        res.render("../views/admin/blogpost",{data:blogdata})
    }catch(err){
        console.log(err)
    }
}
const amblogpost=(req,res)=>{
    try{
        const blogsave=new blogmodel({
            title:req.body.title,
            description:req.body.description,
            image:req.file.filename
        });
        blogsave.save();
        res.redirect("/admin/blog")
    }catch(err){
        console.log(err)
    }
}
const amblogdel=async(req,res)=>{
    try{
        await blogmodel.findByIdAndDelete({_id:req.params.id});
         res.redirect("/admin/blog")
    }catch(err){
        console.log(err)
    }
}
// !gdgdgd

const amblogupdate=async(req,res)=>{
    try{
        const getdata=await blogmodel.findById({_id:req.params.id});
        res.render("../views/admin/blogupdate",{data:getdata})
    }catch(err){
        console.log(err)
    }
}
// admin blog route
const amgallery=async(req,res)=>{
    try{
        const getgallerydata=await gallerymodel.find();
        res.render("../views/admin/amgallery",{data:getgallerydata})
    }catch(err){
        console.log(err)
    }
}
const admingallerydel=async(req,res)=>{
    try{
       await  gallerymodel.findByIdAndDelete({_id:req.params.id});
         res.redirect("/admin/gallery")
    }catch(err){
        console.log(err)
    }
}
const amgallerypost=(req,res)=>{
    try{
        const amgallerysave=new gallerymodel({
            image:req.file.filename
        });
        amgallerysave.save();
        res.redirect("/admin/gallery")
    }catch(err){
        console.log(err)
    }
}
//? admin information
const information=async(req,res)=>{
    try{
        const adminid=req.session.user_id;
        const adminifocollect=await memberschema.findById({_id:adminid});
        console.log(adminifocollect.memberid)
        res.render("../views/admin/information",{admininfo:adminifocollect})
    }catch(err){
        console.log(err)
    }
}

const adinformationpost=async(req,res)=>{
    try{
        const {email,mobile,memberid}=req.body;
        const adminid=req.session.user_id;
        console.log(adminid)
         const admininfofind=await memberschema.findByIdAndUpdate({_id:adminid},{$set:{email:req.body.email,mobile:req.body.number,memberid:req.body.memberid}});
        res.render("../views/admin/information",{admininfo:admininfofind,message:"your information updated successfully."})
    }catch(err){
        console.log(err)
    }
}
//? admin information
// add user
const adduser=(req,res)=>{
    try{
        res.render("../views/admin/adduser")
    }catch(err){
        console.log(err)
    }
}
const adduserpost=(req,res)=>{
    try{
       const {name,email,mobile,memberid}=req.body;
       const addusersave=new adminschema({
        name,email,mobile,memberid,userimage:req.file.filename
       });
       addusersave.save();
       res.render("../views/admin/adduser",{message:"User added succesfully !"})
    }catch(err){
        console.log(err)
    }
}
const users=(req,res)=>{
    try{
        res.render("../views/admin/users")
    }catch(err){
        console.log(err)
    }
}
// admin income 
const adminincomepost=(req,res)=>{
    try{
       const {type,source,amount,membercode}=req.body;
       const incomepostsave=new adincomemodel({
        type,source,amount,membercode
       });
       incomepostsave.save();
       res.redirect("/admin/income");
    }catch(err){
        console.log(err)
    }
}
const incomeupdate=async(req,res)=>{
    try{
        const getdata=await adincomemodel.findById({_id:req.params.id});
        res.render("../views/admin/incomeupdate",{data:getdata})
    }catch(err){
        console.log(err)
    }
}
const incomeupdatepost=async(req,res)=>{
    try{
        const {type,source,amount,membercode}=req.body;
        await adincomemodel.findByIdAndUpdate({_id:req.params.id},{$set:{type,source,amount,membercode}}) ;
        res.redirect("/admin/income")
    }catch(err){
        console.log(err)
    }
}
const income=async(req,res)=>{
    try{
        const adminincomedata=await adincomemodel.find();
        res.render("../views/admin/income",{data:adminincomedata})
    }catch(err){
        console.log(err)
    }
}
const incomedelete=async(req,res)=>{
    try{
         await adincomemodel.findByIdAndDelete({_id:req.params.id});
         res.redirect("/admin/income")
    }catch(err){
        console.log(err)
    }
}
// admin expenses
const expensesupdatepost=async(req,res)=>{
    try{
        const {type,source,amount,destination}=req.body;
        await adexpensesmodel.findByIdAndUpdate({_id:req.params.id},{$set:{type,source,amount,destination}}) ;
        res.redirect("/admin/expenses")
    }catch(err){
        console.log(err)
    }
}
const adexpensesost=(req,res)=>{
    try{
      const {type,source,amount,destination}=req.body;
      const expensessave=new adexpensesmodel({
        type,source,amount,destination
      });
      expensessave.save();
      res.redirect("/admin/expenses")
    }catch(err){
        console.log(err)
    }
}
const expensesupdate=async(req,res)=>{
    try{
        // const {type,source,amount,membercode}=req.body;
        // await adexpensesmodel.findByIdAndUpdate({_id:req.params.id},{$set:{type,source,amount,membercode}}) ;
        // res.redirect("/admin/expenses")
          const getdataexpenses=await adexpensesmodel.findById({_id:req.params.id});
        res.render("../views/admin/expensesupdate",{data:getdataexpenses})
    }catch(err){
        console.log(err)
    }
}
const expensesdelete=async(req,res)=>{
    try{
         await adexpensesmodel.findByIdAndDelete({_id:req.params.id});
         res.redirect("/admin/expenses")
    }catch(err){
        console.log(err)
    }
}
const expenses=async(req,res)=>{
    try{
        const getexpenses=await adexpensesmodel.find();
        res.render("../views/admin/expenses",{data:getexpenses})
    }catch(err){
        console.log(err)
    }
}
const adminout=(req,res)=>{
    try{
        req.session.destroy();
        res.redirect("/")
    }catch(err){
        console.log(err)
    }
}
// admin controller

// member controller
const member=async(req,res)=>{
    try{
        const memberdata=await memberschema.findById({_id:req.session.memuser_id});
        res.render("../views/member/member",{memberdata:memberdata})
    }catch(err){
        console.log(err)
    }
}
const memberincome=async(req,res)=>{
    try{
        const memberdata=await memberschema.findById({_id:req.session.memuser_id});
         const adminincomedatas=await adincomemodel.find();
        res.render("../views/member/memincome",{data:adminincomedatas,memberdata:memberdata})
    }catch(err){
        console.log(err)
    }
}
const memberexpenses=async(req,res)=>{
    try{
        const memberdata=await memberschema.findById({_id:req.session.memuser_id});
           const getexpensesdata=await adexpensesmodel.find();
        res.render("../views/member/memexpenses",{data:getexpensesdata,memberdata:memberdata})
    }catch(err){
        console.log(err)
    }
}
const memberuser=async(req,res)=>{
    try{
        const memberdata=await memberschema.findById({_id:req.session.memuser_id});
        res.render("../views/member/memuser",{memberdata:memberdata})
    }catch(err){
        console.log(err)
    }
}
const memberlogout=(req,res)=>{
    try{
       req.session.destroy();
       res.redirect("/")
    }catch(err){
        console.log(err)
    }
}
// member controller

// accounts
const account=async(req,res)=>{
    try{
        const datauser=await memberschema.findById({_id:req.session.acuser_id})
        console.log(datauser)
        res.render("../views/account/account",{userdata:datauser})
    }catch(err){
        console.log(err)
    }
}
const accountcollections=async(req,res)=>{
    try{
        const datauser=await memberschema.findById({_id:req.session.acuser_id})
        const getincomedata=await adincomemodel.find(); 
        res.render("../views/account/accollections",{data:getincomedata,userdata:datauser})
    }catch(err){
        console.log(err)
    }
}
const accountout=(req,res)=>{
    try{
        req.session.destroy();
        res.redirect("/")
    }catch(err){
        console.log(err)
    }
}
const acexpenses=async(req,res)=>{
    try{
        const datauser=await memberschema.findById({_id:req.session.acuser_id})
        const getexpenses=await adexpensesmodel.find(); 
        res.render("../views/account/acexpenses",{data:getexpenses,userdata:datauser})
    }catch(err){
        console.log(err)
    }
}
// accounts

// update
const updatedata=(req,res)=>{
    try{
       res.render("../views/update")
    }catch(err){
        console.log(err)
    }
}
// 404 error page
const errorpage=(req,res)=>{
    try{
        const linkparams=req.params.id;
         res.render("../views/errorpage",{message:linkparams})
    }catch(err){
        console.log(err)
    }
}

module.exports={home,login,admin,amblog,
    amgallery,information,adduser,users,
    income,expenses,member,memberincome,
    memberexpenses,memberuser,memberlogout,
    account,loginpost,adminout,adinformationpost,amblogpost,
    adminincomepost,adexpensesost,adduserpost,
    accountout,updatedata,errorpage,amgallerypost,
    admingallerydel,incomedelete,incomeupdate,
    incomeupdatepost,expensesdelete,expensesupdate,
   expensesupdatepost,accountcollections,amblogdel,
   amblogupdate,acexpenses}