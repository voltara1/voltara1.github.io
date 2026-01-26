-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema voltara
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema voltara
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `voltara` DEFAULT CHARACTER SET utf8 ;
USE `voltara` ;

-- -----------------------------------------------------
-- Table `voltara`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `voltara`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('USER', 'ADMIN') NULL DEFAULT 'USER',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `voltara`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `voltara`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `voltara`.`tutorial`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `voltara`.`tutorial` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT(65535) NOT NULL,
  `content` TEXT(65535) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `curated` TINYINT NOT NULL DEFAULT 0,
  `proficiency` ENUM('BASIC', 'INTERMEDIATE', 'ADVANCE') NOT NULL DEFAULT 'BASIC',
  PRIMARY KEY (`id`, `users_id`, `category_id`),
  INDEX `fk_tutorial_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_tutorial_category1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_tutorial_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `voltara`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tutorial_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `voltara`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `voltara`.`img`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `voltara`.`img` (
  `tutorial_id` INT NOT NULL,
  `image_main` VARCHAR(255) NOT NULL,
  `image_schematic` VARCHAR(255) NOT NULL,
  `image_layout` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tutorial_id`),
  CONSTRAINT `fk_img_tutorial`
    FOREIGN KEY (`tutorial_id`)
    REFERENCES `voltara`.`tutorial` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `voltara`.`upload`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `voltara`.`upload` (
  `tutorial_id` INT NOT NULL,
  `file_bom` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tutorial_id`),
  CONSTRAINT `fk_upload_tutorial1`
    FOREIGN KEY (`tutorial_id`)
    REFERENCES `voltara`.`tutorial` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
