CREATE TABLE IF NOT EXISTS `students` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  gender ENUM['M', 'F', 'X'],
  DOB date,
  specialized varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;