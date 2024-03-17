CREATE DATABASE DAPM;
GO
USE DAPM;
GO
-- Tạo bảng seller
CREATE TABLE seller (
    seller_id INT PRIMARY KEY,
    seller_name VARCHAR(255) NOT NULL,
    seller_email VARCHAR(255) UNIQUE NOT NULL,
    seller_password VARCHAR(255) NOT NULL
);

-- Tạo bảng category
CREATE TABLE category (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

-- Tạo bảng brands
CREATE TABLE brands (
    brand_id INT PRIMARY KEY IDENTITY(1,1),
    brand_name NVARCHAR(MAX) NOT NULL
);

-- Tạo bảng products
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    color VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
	brand_id INT,
    FOREIGN KEY (category_id) REFERENCES category(category_id),
	FOREIGN KEY (brand_id) REFERENCES brands(brand_id)
);

-- Tạo bảng users
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tạo bảng cart
CREATE TABLE cart (
    cart_id INT PRIMARY KEY,
    cart_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    color VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    quantity INT NOT NULL,
    product_id INT,
    user_id INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- Chèn dữ liệu vào bảng seller
INSERT INTO seller (seller_id, seller_name, seller_email, seller_password)
VALUES
    (1, 'Như Ý', 'NhuY@seller.com', 'abc@123'),
    (2, 'MinhToan', 'MinhToan@seller.com', 'abc@123'),
    (3, 'MinhHien', 'MinhHien@seller.com', 'abc@123'),
    (4, 'Lemon', 'abc@gmail.com', '123456'),
    (5, 'sam sidhu', 'sam@seller.com', 'abc@123'),
    (6, 'peter', 'peter@test.com', 'abc@123');

-- Chèn dữ liệu vào bảng category
INSERT INTO category (category_id, category_name)
VALUES
    (1, 'Điện thoại'),
    (2, 'Máy tính'),
    (3, 'Tivi'),
    (4, 'Laptop'),
    (5, 'Đồng hồ'),
    (6, 'Tai nghe'),
    (7, 'Phụ kiện');
	-- Chèn dữ liệu vào bảng brands
INSERT INTO brands (brand_id, brand_name)
VALUES
    (1, 'Apple'),
    (2, 'Samsung'),
    (3, 'HP'),
    (4, 'Sony'),
    (5, 'Dell');
-- Chèn dữ liệu vào bảng products
INSERT INTO products (product_id, product_name, price, category_id, color, description, image, brand_id)
VALUES
    (1, 'Iphone 14 Pro Max 128GB', 5500, 1, 'Black', 'IPhone 14 Pro Max 128GB là lựa chọn phù hợp cho những ai muốn sở hữu phiên bản cao cấp nhất của dòng điện thoại iPhone 14', 'https://24hstore.vn/images/products/2023/04/13/original/iphone-14-cu-midnight.jpg', 1),
    (2, 'IPhone 13 128GB', 6000, 1, 'White', 'Máy mới 100% , chính hãng Apple Việt Nam.', 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/r/tr_ng_5.jpg', 1),
    (3, 'IPhone 13 128GB', 6000, 1, 'Blue', 'Máy mới 100% , chính hãng Apple Việt Nam.', 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/d/_/d_ng_3.jpg', 1),
    (4, 'IPhone 13 128GB', 6000, 1, 'Red', 'Máy mới 100% , chính hãng Apple Việt Nam.', 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/f/i/file_3_10.jpg', 1),
    (5, 'Samsung Galaxy Z Flip 4 5G 128GB', 8000, 1, 'Blue', 'Galaxy Z Flip4 là chiếc smartphone sinh ra dành cho các tín đồ thời trang', 'https://tabletplaza.vn/images/variant_image/22/q_50pr-ge.jpg', 2),
    (6, 'Samsung Galaxy S23 Ultra 5G 512GB', 8000, 1, 'White', 'Thiết kế của S23 Ultra còn rất chú trọng đến việc thân thiện với môi trường khi sử dụng 12 linh kiện bảo vệ môi trường', 'https://tabletplaza.vn/images/thumbnails/450/320/detailed/24/bedbf827-c6eb-4298-b13b-bf50445bc5e8_3mbh-al.jpg', 2),
    (7, 'BỘ HP 280 PRO G9 - AL09', 100000, 2, 'White', 'Sở hữu 6 nhân 12 luồng theo kiến trúc Alder Lake mới, hỗ trợ socket LGA 1700 mang lại hiệu năng sử dụng vô cùng vượt trội', 'https://vitinhmiennam.com/upload/sanpham/large/bo-hp-280-pro-g9-al09-1173-1.jpg', 3),
    (8, 'Bộ PC AOpen AEOLUS A28G - RTX3080', 200000, 2, 'Black', 'AOpen AEOLUS A28G - RTX3080 là bộ PC chơi game mạnh mẽ với CPU Intel Core i9-12900K và GPU Nvidia RTX 3080.', 'https://cdn.tgdd.vn/Products/Images/1942/241597/aopen-aeolus-a28g-rtx3080-3.jpg', 3),
    (9, 'LG OLED 4K 65 inch', 12000, 3, 'Black', 'LG OLED 4K 65 inch là một trong những mẫu TV OLED hàng đầu trên thị trường với chất lượng hình ảnh và âm thanh xuất sắc.', 'https://www.lg.com/us/images/tvs/md07518502/gallery/oled-oled4k-tv-ai-thinq-webos-01.jpg', 4),
    (10, 'Sony Bravia 4K 55 inch', 9500, 3, 'Black', 'Sony Bravia 4K 55 inch là một chiếc TV 4K với công nghệ hình ảnh và âm thanh hàng đầu từ Sony.', 'https://www.sony.com.vn/image/4b034fd29a65bc9aee083f0eb88f4ea0?fmt=pjpeg&wid=330&hei=330&bgcolor=FFFFFF&bgc=FFFFFF', 4),
    (11, 'Dell XPS 15', 15000, 4, 'Silver', 'Dell XPS 15 là một trong những chiếc laptop cao cấp của Dell với cấu hình mạnh mẽ và thiết kế đẹp.', 'https://image-us.samsung.com/SamsungUS/samsungdesign/overlay-form/fill-320-380/img.png', 5),
    (12, 'MacBook Pro M2 13 inch', 18000, 4, 'Silver', 'MacBook Pro M2 13 inch là chiếc laptop cao cấp của Apple với hiệu suất mạnh mẽ và màn hình Retina đẹp.', 'https://www.apple.com/v/macbook-pro-m2-1d/images/overview/hero__dla5du80c36q_large.jpg', 5),
    (13, 'Apple Watch Series 7', 7000, 5, 'Silver', 'Apple Watch Series 7 là phiên bản mới nhất của dòng đồng hồ thông minh Apple Watch với nhiều tính năng mới.', 'https://www.apple.com/v/apple-watch-series-7/r/images/overview/hero__dla5du80c36q_large.jpg', 5),
    (14, 'Samsung Galaxy Watch 4', 5500, 5, 'Black', 'Samsung Galaxy Watch 4 là chiếc đồng hồ thông minh chạy hệ điều hành Wear OS của Google với nhiều tính năng sức khỏe.', 'https://tabletplaza.vn/images/variant_image/45/q_50-41wz6ddjhzl.jpg', 2),
    (15, 'Sony WH-1000XM4', 2500, 6, 'Black', 'Sony WH-1000XM4 là tai nghe không dây chống ồn hàng đầu với chất lượng âm thanh tốt và tính năng chống ồn xuất sắc.', 'https://www.sony.com.vn/image/e748f051e7e97aa8d67d7dd78f8edca9?fmt=pjpeg&wid=330&hei=330&bgcolor=FFFFFF&bgc=FFFFFF', 4),
    (16, 'AirPods Pro', 3500, 6, 'White', 'AirPods Pro là tai nghe không dây của Apple với chất lượng âm thanh cao cấp và tính năng chống ồn.', 'https://cdn.tgdd.vn/Products/Images/76/220833/airpods-pro-white-600x600.jpg', 1),
    (17, 'Tai nghe SteelSeries Arctis 7X', 1500, 6, 'Black', 'SteelSeries Arctis 7X là tai nghe chơi game không dây dành cho các game thủ console với âm thanh chất lượng cao.', 'https://cdn.tgdd.vn/Products/Images/2164/230236/SteelSeries-Arctis-7X-Wireless-Black-600x600.jpg', 2);
-- chèn dữ liệu vào bảng users
INSERT INTO users (user_id, user_name, user_email, password)
VALUES
    (1, 'anil', 'anil@user.com', 'abc123'),
    (2, 'peter', 'peter@user.com', 'abc123'),
    (3, 'hyden', 'hyden@user.com', 'abc123'),
    (4, 'tony', 'tony@user.com', 'abc123'),
    (5, 'Huỳnh Như Ý', 'yhuynh1601@yahoo.com', '123456'),
    (6, 'Huỳnh Như Ý', 'huynh.nhu.y1601@gmail.com', '123456');
-- chèn dữ liệu vào bảng cart
INSERT INTO cart (cart_id, cart_name, price, category_id, color, description, image, quantity, product_id, user_id)
VALUES
    (1, 'Iphone 14 Pro Max 128GB', 5500.00, 1, 'Black', 'IPhone 14 Pro Max 128GB là lựa chọn phù hợp cho những ai muốn sở hữu phiên bản cao cấp nhất của dòng điện thoại iPhone 14', 'https://24hstore.vn/images/products/2023/04/13/original/iphone-14-cu-midnight.jpg', 1, 1, 5);
