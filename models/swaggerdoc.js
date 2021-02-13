/**
 * @swagger
 * components:
 *   schemas:
 *     Meme:
 *       type: object
 *       required:
 *         - name
 *         - url
 *         - caption
 *       properties:
 *         id:
 *           type: string
 *           description: auto generated object id of MongoDB
 *         name:
 *           type: string
 *           description: name of person posting the meme
 *         url:
 *           type: string
 *           description: url of meme image
 *         caption:
 *           type: string
 *           description: caption for meme
 *       example:
 *           _id: 60213737cc42463e18842865
 *           name: Neenad
 *           url: https://images.indianexpress.com/2021/02/elon-musk-doge-support-memes.jpg
 *           caption: Doge Meme
 */


/**
 * @swagger
 * tags:
 *   name: Memes
 *   description: Api to manage memes
 */


/**
 * @swagger
 * paths:
 *   /memes:
 *     get:
 *       description: Used to fetch memes sorted by creation time
 *       tags: [Memes]
 *       responses:
 *         '200':
 *           description: successfully fetched all the memes
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   meme:
 *                     - _id: 60213737cc42463e18842865
 *                       name: xyz
 *                       url: https://images.indianexpress.com/2021/02/elon-musk-doge-support-memes.jpg
 *                       caption: lol
 *                   message: successfully fetched latest memes
 *                   status: success
 *         '500':
 *           description: server error 
 *     post:
 *       description: Post a meme to the application
 *       tags: [Memes]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 name: xyz
 *                 url: https://images.indianexpress.com/2021/02/elon-musk-doge-support-memes.jpg
 *                 caption: funny
 *       responses:
 *         "200":
 *           description: posted meme successfully  
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   status: success
 *                   message: successfully posted your meme
 *                   id: 60213737cc42463e18842865                    
 *         "409":
 *           description: duplicate post of meme not allowed
 *         "500":
 *           description: server error  
 *     patch:
 *       description: Not supported on /memes route
 *       tags: [Memes]
 *       responses:
 *         "405":
 *           description: http method not allowed on this route
 *         "500":
 *           description: server error   
 *     delete:
 *       description: Not supported on /memes route
 *       tags: [Memes]
 *       responses:
 *         "405":
 *           description: http method not allowed on this route
 *         "500":
 *           description: server error   
 *   /memes/{id}:
 *     get:
 *       description: Used to fetch meme with specific id
 *       tags: [Memes]
 *       responses:
 *         '200':
 *           description: successfully fetched the meme
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   meme:
 *                     _id: 60213737cc42463e18842865 
 *                     name: neenad
 *                     url:  https://images.indianexpress.com/2021/02/elon-musk-doge-support-memes.jpg
 *                     caption: rofl
 *                   status: success
 *         '404':
 *           description: meme with specific id does not exists
 *         '500':
 *           description: server error 
 *     patch:
 *       description: Used to update caption or url or both for a particular meme
 *       tags: [Memes] 
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 url:  https://images.indianexpress.com/2021/02/elon-musk-doge-support-memes.jpg
 *                 caption: lol 
 *       responses:
 *         '200':
 *           description: successfully updated meme
 *           content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  example:
 *                    status: success
 *                    message: successfully updated meme
 *                    url:  https://images.indianexpress.com/2021/02/elon-musk-doge-support-memes.jpg
 *                    caption: lol
 *         '406':
 *           description: name cannot be updated for a meme
 *         '500':
 *           description: server error 
 *     delete:
 *       description: Used to delete meme with the specific id
 *       tags: [Memes]
 *       responses:
 *         '200':
 *           description: successfully deleted meme
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example: 
 *                   status: success
 *                   message: successfully deleted meme
 *         '500':
 *           description: server error 
 *     post:
 *       description: Not supported on /memes/:id route
 *       tags: [Memes]
 *       responses:
 *         "405":
 *           description: http method not allowed on this route
 *         "500":
 *           description: server error 
 * 
 */