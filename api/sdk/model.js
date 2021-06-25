const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    x = (data[0] - 4.2064) / 17.32172345
    y = (data[1] - -2.565) / 24.97975683
    z = (data[2] - -289.072) / 20.3396711
    return [x, y, z]
}

function denormalized(data){
    x = (data[0] * 552.6264) + 650.4795
    y = (data[1] * 12153.8) + 10620.5615
    z = (data[2] * 12153.8) + 10620.5615
    return [m1, m2, m3]
}


async function predict(data){
    let in_dim = 3;
    
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
  
