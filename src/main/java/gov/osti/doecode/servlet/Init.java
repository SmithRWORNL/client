package gov.osti.doecode.servlet;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.github.jknack.handlebars.Handlebars;
import com.github.jknack.handlebars.Jackson2Helper;
import com.github.jknack.handlebars.io.ServletContextTemplateLoader;
import com.github.jknack.handlebars.io.TemplateLoader;
import gov.osti.doecode.utils.JsonObjectUtils;
import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import org.apache.commons.io.FileUtils;

public class Init extends HttpServlet {

     private static final long serialVersionUID = 1L;
     private static Logger log = LoggerFactory.getLogger(Init.class.getName());
     public static Handlebars handlebars;
     public static Handlebars handlebarsUser;
     public static String css_string;
     public static String app_name;
     public static ArrayNode availabilities_list;
     public static ArrayNode licenses_list;
     public static ArrayNode software_type;
     public static ArrayNode research_org_list;
     public static ArrayNode sponsor_org_list;
     public static ArrayNode sort_list;
     public static ArrayNode affiliations_list;
     public static ArrayNode countries_list;
     public static ArrayNode contributor_type_list;
     public static ArrayNode states_list;

     public static int SESSION_TIMEOUT_MINUTES;

     public Init() {
     }

     public void init(ServletConfig config) throws ServletException {
          super.init(config);

          //Initialize the main template loader
          TemplateLoader loader = new ServletContextTemplateLoader(
                  getServletContext(), "/WEB-INF/templates", ".mustache");
          handlebars = new Handlebars(loader);
          handlebars.registerHelper("json", Jackson2Helper.INSTANCE);

          //Initialize the user template loader
          TemplateLoader loader2 = new ServletContextTemplateLoader(getServletContext(), "/WEB-INF/templates/user", ".mustache");
          handlebarsUser = new Handlebars(loader2);

          //Pull the css into a string
          String css_path = getServletContext().getRealPath("./css/");
          File servlet_path = new File(css_path);
          if (servlet_path.exists() && servlet_path.isDirectory()) {
               css_string = getFileData(new File(css_path + "doecode-css.css"));
          }

          //Get the name of the app from the web.xml
          app_name = getServletContext().getInitParameter("app_name");

          //Get the session timeout from the web.xml
          SESSION_TIMEOUT_MINUTES = Integer.parseInt(getServletContext().getInitParameter("session_timeout"));

          //Get the most commonly used json files, and load them into objects
          String jsonPath = getServletContext().getRealPath("./json");
          try {
               availabilities_list = JsonObjectUtils.getJsonList((jsonPath + "/" + JsonObjectUtils.AVAILABILITIES_LIST_JSON), JsonObjectUtils.AVAILABILITIES_LIST_JSON_KEY);
               licenses_list = JsonObjectUtils.getJsonList((jsonPath + "/" + JsonObjectUtils.LICENSE_OPTIONS_LIST_JSON), JsonObjectUtils.LICENSE_JLIST_SON_KEY);
               software_type = JsonObjectUtils.getJsonList((jsonPath + "/" + JsonObjectUtils.SOFTWARE_TYPES_LIST_JSON), JsonObjectUtils.SOFTWARE_TYPES_LIST_JSON_KEY);
               research_org_list = JsonObjectUtils.getJsonList((jsonPath + "/" + JsonObjectUtils.RESEARCH_ORG_LIST_JSON), JsonObjectUtils.RESEARCH_ORG_LIST_JSON_KEY);
               sponsor_org_list = JsonObjectUtils.getJsonList((jsonPath + "/" + JsonObjectUtils.SPONSOR_ORG_LIST_JSON), JsonObjectUtils.SPONSOR_ORG_LIST_JSON_KEY);
               sort_list = JsonObjectUtils.getJsonList((jsonPath + "/" + JsonObjectUtils.SEARCH_SORT_OPTIONS_LIST_JSON), JsonObjectUtils.SEARCH_SORT_LIST_JSON_KEY);
               affiliations_list = JsonObjectUtils.getJsonList(jsonPath + "/" + JsonObjectUtils.AFFILIATIONS_LIST_JSON, JsonObjectUtils.AFFILIATIONS_LIST_JSON_KEY);
               countries_list = JsonObjectUtils.getJsonList(jsonPath + "/" + JsonObjectUtils.COUNTRIES_LIST_JSON, JsonObjectUtils.COUNTRIES_LIST_JSON_KEY);
               contributor_type_list = JsonObjectUtils.getJsonList(jsonPath + "/" + JsonObjectUtils.CONTRIBUTOR_TYPES_LIST_JSON, JsonObjectUtils.CONTRIBUTOR_TYPES_LIST_JSON_KEY);
               states_list = JsonObjectUtils.getJsonList(jsonPath + "/" + JsonObjectUtils.STATE_LIST_JSON, JsonObjectUtils.STATE_LIST_JSON_KEY);
          } catch (IOException ex) {
               log.error("Error in loading json lists while initializing: " + ex.getMessage());
          }

          log.info("DOE CODE Application Started");
     }

     private String getFileData(File f) {
          String return_data = "";
          try {
               return_data = FileUtils.readFileToString(f);
          } catch (IOException ex) {
               log.error("Can't read file for css: " + ex.getMessage());
          }
          return return_data;
     }
}
