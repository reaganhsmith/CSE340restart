CREATE TYPE public.account_type AS ENUM
    ('Client', 'Employee', 'Admin');

ALTER TYPE public.account_type
    OWNER TO cse340rms;


-- Table structure for table "classification"
CREATE TABLE public.classification (
	classification_id INT GENERATED BY DEFAULT AS IDENTITY,
	classification_name CHARACTER VARYING NOT NULL,
	CONSTRAINT classification_pk PRIMARY KEY (classification_id)
);

-- Table structure for table "inventory"
CREATE TABLE IF NOT EXISTS public.inventory
(
	inv_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	inv_make character varying NOT NULL,
	inv_model character varying NOT NULL,
	inv_year character(4) NOT NULL,
	inv_description character varying NOT NULL,
	inv_image character varying NOT NULL,
	inv_thumbnail character varying NOT NULL,
	inv_price numeric(9, 0) NOT NULL,
	inv_miles integer NOT NULL,
	inv_color character varying NOT NULL, 
	classification_id integer NOT NULL,
	CONSTRAINT inventory_pkey PRIMARY KEY (inv_id)
);

-- Create relationship between 'classiification' and 'inventory' tables
ALTER TABLE IF EXISTS public.inventory
	ADD CONSTRAINT fk_classification FOREIGN KEY (classification_id)
	REFERENCES public.classification (classification_id) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE NO ACTION;


-- table structure for table 'account'
CREATE TABLE IF NOT EXISTS public.account
(
	account_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	account_firstname character varying NOT NULL,
	account_lastname character varying NOT NULL,
	account_email character varying NOT NULL,
	account_password character varying NOT NULL,
	account_type account_type NOT NULL DEFAULT 'Client'::account_type,
	CONSTRAINT account_pkey PRIMARY KEY (account_id)
);


-- data for table 'classification'
INSERT INTO public.classification (classification_name)
VALUES ('custom'),
	('Sport'),
	('SUV'),
	('Truck'),
	('Sedan');
	

-- Updated the inventory files so that the have /vehicles in them 
UPDATE 
	inventory 
SET 
	inv_image = REPLACE(inv_image, 'ges/', 'ges/vehicles/'),
	inv_thumbnail = REPLACE(inv_thumbnail,'ges/', 'ges/vehicles/');



-- Table structure for table "message"
CREATE TABLE public.message (
	message_id INT GENERATED BY DEFAULT AS IDENTITY,
	message_subject CHARACTER VARYING NOT NULL,
	message_body TEXT NOT NULL,
	message_created TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
	message_to INT NOT NULL,
	message_from INT NOT NULL,
	message_read BOOL DEFAULT FALSE NOT NULL,
	message_archived BOOL DEFAULT FALSE NOT NULL
);

-- Table structure for table "message"
CREATE TABLE IF NOT EXISTS public.message
(
	message_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	message_subject character varying NOT NULL,
	message_body character varying NOT NULL,
	message_created timestamp with time zone NOT NULL DEFAULT now(),
	message_to integer NOT NULL,
	message_from integer NOT NULL,
	message_read boolean NOT NULL DEFAULT false,
	message_archived boolean NOT NULL DEFAULT false
)


INSERT INTO public.message (message_subject, message_body, message_to, message_from)
VALUES ('Test Message', 'This message is a test to check if the message system is working', 21, 20)


UPDATE public.message SET message_archived = true WHERE message_id = 4 RETURNING *

DELETE FROM public.message WHERE message_id = 6

UPDATE public.message SET message_read = true WHERE message_id = 4 RETURNING *

-- Get the from persons first name
SELECT account_firstname
FROM account a
JOIN linkinfo l ON l.account_id = a.account_id
JOIN message m ON m.message_from = a.account_id
WHERE m.message_from = 21;