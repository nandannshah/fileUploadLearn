In this we are learning how to use Cloudinary to upload images and videos.
we create a separate server for media files because if we upload on same server our app will be of larger size 
so we store all the static files to a different server called media server.

There will be four handler ImageUPload, videoUpload, ImagereducerUpload ND LocalStorageUpload handler
->In localMediaUpload it fetches file from client local path and upload its to the server. We fetch file from req body by using hierarchy req.files.file