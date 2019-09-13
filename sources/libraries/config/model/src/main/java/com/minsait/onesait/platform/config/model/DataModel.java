/**
 * Copyright Indra Soluciones Tecnologías de la Información, S.L.U.
 * 2013-2019 SPAIN
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.minsait.onesait.platform.config.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.springframework.beans.factory.annotation.Configurable;

import com.minsait.onesait.platform.config.model.base.AuditableEntityWithUUID;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "DATA_MODEL")
@Configurable
public class DataModel extends AuditableEntityWithUUID {

	private static final long serialVersionUID = 1L;

	public enum MainType {
		IOT, SMART_CITIES, GENERAL, SOCIAL_MEDIA, SMART_HOME, SMART_ENERGY, SMART_RETAIL, SMART_INDUSTRY, GSMA,
		FIRMWARE_DATA_MODEL, SYSTEM_ONTOLOGY
	}

	@ManyToOne
	@OnDelete(action = OnDeleteAction.NO_ACTION)
	@JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", nullable = false)
	@Getter
	@Setter
	private User user;

	@Column(name = "JSON_SCHEMA", nullable = false)
	@NotNull
	@Lob
	@Type(type = "org.hibernate.type.TextType")
	@Getter
	@Setter
	private String jsonSchema;

	@Column(name = "NAME", length = 45, unique = true, nullable = false)
	@NotNull
	@Setter
	@Getter
	private String name;

	@Column(name = "TYPE", length = 45, nullable = false)
	@NotNull
	@Setter
	@Getter
	private String type;

	public void setTypeEnum(DataModel.MainType type) {
		this.type = type.toString();
	}

	@Column(name = "DESCRIPTION", length = 255)
	@Setter
	@Getter
	private String description;

	@Column(name = "LABELS", length = 255)
	@Setter
	@Getter
	private String labels;

}
