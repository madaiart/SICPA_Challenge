-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sicpa
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `sicpa` ;

-- -----------------------------------------------------
-- Schema sicpa
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sicpa` DEFAULT CHARACTER SET utf8 ;
USE `sicpa` ;

-- -----------------------------------------------------
-- Table `sicpa`.`enterprises`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sicpa`.`enterprises` ;

CREATE TABLE IF NOT EXISTS `sicpa`.`enterprises` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_by` VARCHAR(60) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `modified_by` VARCHAR(60) NOT NULL,
  `modified_date` DATETIME NOT NULL,
  `status` TINYINT NULL,
  `address` VARCHAR(120) NULL,
  `name` VARCHAR(60) NULL,
  `phone` VARCHAR(10) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sicpa`.`departments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sicpa`.`departments` ;

CREATE TABLE IF NOT EXISTS `sicpa`.`departments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_by` VARCHAR(60) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `modified_by` VARCHAR(60) NOT NULL,
  `modified_date` DATETIME NOT NULL,
  `status` TINYINT NULL,
  `description` VARCHAR(120) NULL,
  `name` VARCHAR(60) NULL,
  `phone` VARCHAR(10) NULL,
  `id_enterprises` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_departments_enterprises`
    FOREIGN KEY (`id_enterprises`)
    REFERENCES `sicpa`.`enterprises` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_dep_ent_idx` ON `sicpa`.`departments` (`id_enterprises` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `sicpa`.`employees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sicpa`.`employees` ;

CREATE TABLE IF NOT EXISTS `sicpa`.`employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_by` VARCHAR(60) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `modified_by` VARCHAR(60) NOT NULL,
  `modified_date` DATETIME NOT NULL,
  `status` TINYINT NULL,
  `age` INT NULL,
  `name` VARCHAR(60) NULL,
  `position` VARCHAR(45) NULL,
  `surname` VARCHAR(60) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sicpa`.`departments_employees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sicpa`.`departments_employees` ;

CREATE TABLE IF NOT EXISTS `sicpa`.`departments_employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_by` VARCHAR(60) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `modified_by` VARCHAR(60) NOT NULL,
  `modified_date` DATETIME NOT NULL,
  `status` TINYINT NULL,
  `id_departments` INT NOT NULL,
  `id_employees` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_departments_employees_departments1`
    FOREIGN KEY (`id_departments`)
    REFERENCES `sicpa`.`departments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_departments_employees_employees1`
    FOREIGN KEY (`id_employees`)
    REFERENCES `sicpa`.`employees` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_dep_emp_idx` ON `sicpa`.`departments_employees` (`id_departments` ASC) VISIBLE;

CREATE INDEX `fk_emp_dep_idx` ON `sicpa`.`departments_employees` (`id_employees` ASC) VISIBLE;

SET SQL_MODE = '';
DROP USER IF EXISTS sicpa_developer;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'sicpa_developer' IDENTIFIED BY 'sicpa';

GRANT ALL ON `sicpa`.* TO 'sicpa_developer';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
