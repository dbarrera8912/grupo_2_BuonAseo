const { render } = require("ejs")
const db = require('../../database/models');
const path = require('path');
const { literal, Op } = require('sequelize');
const category = require("../../database/models/category");
module.exports = {
    questionAll : async (req,res) => {
        try {

            let {page} = req.query;
            let limit = 10;
            
            //La otra opcion2, es exclusivo para traer todos los productos
            
            let opcion1 = {
                limit:limit,
                offset: (page - 1)*limit,
                include:[{association:"responses"}],
                attributes: {
                    include: [
                        [literal(`CONCAT('/api/footer/question/detail/',Question.id)`), 'detail']
                    ]
                },
                };

            const {count:countByQuestions,rows:questions} = await db.Question.findAndCountAll(opcion1);
        
            
            let next = parseInt(page) + 1;
            let previous = parseInt(page) - 1;
            previous_path = "http://localhost/api/footer/question/?page="+ previous;
            next_path = "http://localhost/api/footer/question/?page="+ next;
            if(previous == 0){
                previous_path = "404 not found";
            }
            return res.status(200).json({
				ok : true,
				meta : {
					count : countByQuestions,
                    next: next_path,
                    previous:previous_path,
				},
				data : questions
			})
        } catch (error) {
            //let errors = sendSequelizeError(error);

            return res.status(error.status || 500).json({
                ok: false,
                error,
            });
        }
    },
    questionOne : async (req,res) => {
        /* devuelve sola sola pregunta */
        try {
            let options = {
                where:[
                    {id : req.params.id}
                ],
                include:[
                    {
                        association : 'responses',

                    }
                ]
            };
            let question = await db.Question.findOne(options);
            
            return res.status(200).json({
                ok: true,
                meta: {
                    status : 200,
                    url: "api/products/detail",
                    response:  question.responses,
                },
                data: {
                    question,
                }
            });
            }   
            catch (error) {
                return res.status(error.status || 500).json({
                meta:{
                    status: 500,
                    msg: error.message
                }
                });
            }
    },
  
    paymentAll : async (req,res) => {
        try {

            let {page} = req.query;
            let limit = 10;
            
            //La otra opcion2, es exclusivo para traer todos los productos
            
            let opcion1 = {
                limit:limit,
                offset: (page - 1)*limit,
                include:[{association:"files_payments"},{association:"letter_image_payments"}],
                attributes: {
                    include: [
                        [literal(`CONCAT('/api/footer/payment/detail/',Payment_method.id)`), 'detail']
                    ]
                },
                };

            const {count:countByPayment,rows:payments} = await db.Payment_method.findAndCountAll(opcion1);
        
            
            let next = parseInt(page) + 1;
            let previous = parseInt(page) - 1;
            previous_path = "http://localhost/api/footer/payment/?page="+ previous;
            next_path = "http://localhost/api/footer/payment/?page="+ next;
            if(previous == 0){
                previous_path = "404 not found";
            }
            return res.status(200).json({
				ok : true,
				meta : {
					count : countByPayment,
                    next: next_path,
                    previous:previous_path,
				},
				data : payments
			})
        } catch (error) {
            //let errors = sendSequelizeError(error);

            return res.status(error.status || 500).json({
                ok: false,
                error,
            });
        }
    },
    paymentOne : async (req,res) => {
        /* devuelve sola sola pregunta */
        try {
            let options = {
                where:[
                    {id : req.params.id}
                ],
                include:[
                    {association:"files_payments"},{association:"letter_image_payments"}
                ]
            };
            let payment = await db.Payment_method.findOne(options);
            
            return res.status(200).json({
                ok: true,
                meta: {
                    status : 200,
                    url: "api/products/detail",
                },
                data: {
                    payment,
                }
            });
            }   
            catch (error) {
                return res.status(error.status || 500).json({
                meta:{
                    status: 500,
                    msg: error.message
                }
                });
            }
    },
}