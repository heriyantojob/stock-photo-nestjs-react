  
 export const templateAddSelectAll =  {
    id_template : true,
    title : true,
    description : true,
    status : true,
    update_status : true,
    live_demo_url : true,
    tags :true,
    format_file : true,
    template_slug : true,
    created_at: true,
    updated_at: true,
    
    type_template:true,
  
    // @Column({  nullable: true,default: null})
    // deleted_at!: Date;
  
    deleted_at : true,
  
    user: {},
     // template: {},
   };


   export const templateAddSelectInPublic =  {
    id_template : true,
    title : true,
    description : true,
    status : true,
    update_status : true,
    live_demo_url : true,
    tags :true,
    format_file : true,
    template_slug : true,
    created_at: true,
    updated_at: true,
    
    type_template:true,
  
    // @Column({  nullable: true,default: null})
    // deleted_at!: Date;
  
    deleted_at : true,
  
    user: {
      username:true
    },
     // template: {},
   };
 
 