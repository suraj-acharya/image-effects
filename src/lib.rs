use base64::{encode, decode};
use image::load_from_memory;
use wasm_bindgen::prelude::wasm_bindgen as exposeThisFnToJS;
// use web_sys::console::log_1 as log;
use image::ImageOutputFormat::Png;

#[exposeThisFnToJS]
pub fn greyscale(encoded_file: &str) -> String {
    // Steps : base64 -> binary -> Image Processing -> binary -> base64
    // encoded file present in base 64n string format
    // log(&"GrayScale Called".into());

    let base64_to_vector = decode(encoded_file).unwrap();

    let mut img = load_from_memory(&base64_to_vector).unwrap();
    // log(img);

    img = img.grayscale();

    let mut buffer = vec![];
    img.write_to(&mut buffer, Png).unwrap();

    let encoded_img = encode(&buffer);
    let data_url = format!("data:image/png;base64,{}",encoded_img);
    return data_url;    
}
