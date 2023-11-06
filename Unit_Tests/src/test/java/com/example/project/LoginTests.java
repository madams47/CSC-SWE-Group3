/*
 * Copyright 2015-2022 the original author or authors.
 *
 * All rights reserved. This program and the accompanying materials are
 * made available under the terms of the Eclipse Public License v2.0 which
 * accompanies this distribution and is available at
 *
 * http://www.eclipse.org/legal/epl-v20.html
 */

package com.example.project;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import org.htmlunit.WebClient;
import org.htmlunit.html.HtmlForm;
import org.htmlunit.html.HtmlPage;
import org.htmlunit.html.HtmlSubmitInput;
import org.htmlunit.html.HtmlTextInput;

class LoginTests {

	@Test
	@DisplayName("TestLoginSuccess")
	void testLoginSuccess() throws Exception {
		try (final WebClient webClient = new WebClient()) {
            //webClient.getOptions().setThrowExceptionOnScriptError(false);

            // Get the first page
            final HtmlPage page1 = webClient.getPage("http://localhost:3000/");

            // Get the form that we are dealing with and within that form, 
            // find the submit button and the field that we want to change.
            final HtmlForm form = page1.getFormByName("LoginForm");

            final HtmlSubmitInput submitButton = form.getInputByName("LoginSubmitButton");
            final HtmlTextInput usernameBox = form.getInputByName("LoginUsernameTextbox");
            final HtmlTextInput passwordBox = form.getInputByName("LoginPasswordTextbox");

            // Change the value of the text field
            usernameBox.type("matthew");
            passwordBox.type("invalid");

            // Now submit the form by clicking the button and get back the second page.
            final HtmlPage page2 = submitButton.click();

            final String pageText = page2.asNormalizedText();
            assertTrue(pageText.contains("Invalid username or password. Please try again."));
        }

	}
}
