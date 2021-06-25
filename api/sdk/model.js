const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    x = (data[1] - 12.585) / 6.813882
    y = (data[2] - 51.4795) / 29.151289
    z = (data[3] - 51.4795) / 29.151289
    return [x, y, z]
}

function denormalized(data){
    m1 = (data[1] * 552.6264) + 650.4795
    m2 = (data[2] * 12153.8) + 10620.5615
    m3 = (data[3] * 12153.8) + 10620.5615
    return [m1, m2, m3]
}


async function predict(data){
    let in_dim = 2;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/wandapratama03/jst_inverse/main/public/ex_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
  
