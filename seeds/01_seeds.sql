INSERT INTO users (name, email, password)
VALUES ('Charlie Chandler', 'charlie_email@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
'),
('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
'),
('Louise Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Seaside apartment', 'Really nice view. No bed though.', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 125, 1, 2, 2, 'England', 'Cliff Road', 'Saunton', 'BC', 'V6E 19L', false),
(3, 'Countryside Cottage', 'Lots of grass!', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 240, 2, 2, 3, 'Canada', 'Green Hill Drive', 'Irvines Landing', 'BC', 'V2W 9I2', true),
(2, 'Downtown Penthouse', 'Pretend like you are in the blockbuster summer hit "The Hangover"', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 500, 0, 4, 4, 'Canada', 'Lakeside Boulevard', 'Toronto', 'ON', 'T5R 6T6', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2022-08-17', '2022-08-23', 3, 3), 
('2022-05-15', '2022-05-17', 3, 2),
('2022-08-30', '2022-09-03', 2, 1);

INSERT INTO property_reviews (guest_id, properties_id, reservation_id, rating, message)
VALUES (3, 2, 1, 3, 'messages'),
(2, 2, 2, 4, 'messages'),
(3, 1, 3, 4, 'messages');

