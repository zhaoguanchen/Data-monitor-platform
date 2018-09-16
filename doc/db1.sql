CREATE TABLE `column_rule_db` (
  `column_id` int(11) NOT NULL,
  `monitor_type` varchar(20) NOT NULL,
  `condition` varchar(200) NOT NULL,
  `table_name` varchar(100) NOT NULL,
  `column_name` varchar(100) NOT NULL,
  `database_name` varchar(50) NOT NULL,
  `calculate_type` varchar(50) NOT NULL,
  `deviation` varchar(50) NOT NULL,
  `h_compare` varchar(100) default NULL,
  `t_compare` varchar(100) default NULL,
  `self` varchar(100) default NULL,
  `day_increment` varchar(100) default NULL,
  `alarm_type` varchar(20) NOT NULL,
  `remark` varchar(100) NOT NULL,
  `owner` varchar(50) NOT NULL,
  `content` varchar(100) NOT NULL,
  `reciever` varchar(100) NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




CREATE TABLE `day_date_db` (
  `id` int(11) NOT NULL,
  `datebase_name` varchar(30) NOT NULL,
  `table_name` varchar(30) NOT NULL,
  `count` int(200) NOT NULL,
  `sum` double(200,0) NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `dictionary_db` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `rule_running_log_db` (
  `id` int(11) NOT NULL,
  `level_type` varchar(30) NOT NULL,
  `type` varchar(100) NOT NULL,
  `leader` varchar(20) NOT NULL,
  `scope` varchar(50) NOT NULL,
  `value` varchar(500) NOT NULL,
  `status` varchar(10) NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `table_rule_db` (
  `id` int(11) NOT NULL,
  `monitor_type` varchar(20) NOT NULL,
  `condition` varchar(200) NOT NULL,
  `table_name` varchar(100) NOT NULL,
  `database_name` varchar(50) NOT NULL,
  `h_compare` varchar(100) default NULL,
  `t_compare` varchar(100) default NULL,
  `self` varchar(100) default NULL,
  `seven_wave_avg` varchar(100) default NULL,
  `alarm_type` varchar(20) NOT NULL,
  `remark` varchar(100) NOT NULL,
  `owner` varchar(50) NOT NULL,
  `content` varchar(100) NOT NULL,
  `reciever` varchar(100) NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
